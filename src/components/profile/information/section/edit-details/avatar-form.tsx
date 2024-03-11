'use client';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Button, Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { RRAvatar } from 'ui-component/avatar';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ProfileAvatarForm = () => {
  const { user, onUpdateAvatar } = useAuth();
  const intl = useIntl();
  const dispatch = useDispatch();

  let imageRef = useRef<HTMLInputElement>(null);
  const [_, setIsDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    setIsDisabled(false);
    setSelectedFile(e.target.files[0]);
  };

  const cancelHandler = () => {
    setSelectedFile(null);
    setIsDisabled(true);
  };

  const handleFileTrigger = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        throw Error(intl.formatMessage({ id: 'select-image' }));
      }
      setIsDisabled(true);

      const formData = new FormData();
      formData.append('image', selectedFile as any);
      await onUpdateAvatar(formData);
      dispatch(
        openSnackbar({
          open: true,
          message: intl.formatMessage({ id: 'success' }),
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'success'
          }
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: error?.detail ?? error.message,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  console.log();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RRAvatar
          src={
            selectedFile
              ? (URL.createObjectURL(selectedFile) as string)
              : user?.image
                ? `${process.env.NEXT_PUBLIC_MEDIA}${user?.image}`
                : ''
          }
          alt={`${user?.first_name}${user?.email}`}
          size={100}
        />
      </Grid>
      <Grid item xs={12}>
        <input accept="image/*" ref={imageRef} style={{ display: 'none' }} type="file" onChange={handleFileChange} />
        <Button fullWidth variant="outlined" color="info" type="button" startIcon={<UploadTwoToneIcon />} onClick={handleFileTrigger}>
          <FormattedMessage id="upload" />
        </Button>
      </Grid>
      <Grid item xs={12} display="flex" gap={1}>
        <Grid item xs={6}>
          <AnimateButton>
            <Button fullWidth variant="contained" color="error" onClick={cancelHandler}>
              <FormattedMessage id="cancel" />
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={6}>
          <AnimateButton>
            <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}>
              <FormattedMessage id="save" />
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Grid>
  );

  // return (
  //   <Formik
  //     initialValues={{
  //       image: user?.image ? `${process.env.NEXT_PUBLIC_MEDIA}${user.image}` : null
  //     }}
  //     validationSchema={Yup.object().shape({
  //       image: Yup.string().notRequired()
  //     })}
  //     onSubmit={handleSubmit}
  //   >
  //     {({ values, handleSubmit }) => (
  //       <form noValidate onSubmit={handleSubmit}>
  //         <Grid container spacing={gridSpacing}>
  //           <Grid item xs display="flex" alignItems="center" justifyContent="space-between">
  //             <Grid item>
  //               <RRAvatar
  //                 src={selectedFile ? (URL.createObjectURL(selectedFile) as string) : (values?.image as string)}
  //                 alt={`${user?.first_name}${user?.email}`}
  //                 size={52}
  //               />
  //             </Grid>
  //             <Grid item>
  //               <input accept="image/*" ref={imageRef} style={{ display: 'none' }} type="file" onChange={handleFileChange} />
  //               <Button variant="outlined" color="info" type="button" startIcon={<UploadTwoToneIcon />} onClick={handleFileTrigger}>
  //                 <FormattedMessage id="upload" />
  //               </Button>
  //             </Grid>
  //           </Grid>

  //           <Grid item xs flexDirection="row" display="flex" justifyContent="space-between" alignItems="center">
  //             <Grid item>
  //               <Button variant="contained" color="error" type="button" disabled={isDisabled} onClick={cancelHandler}>
  //                 <FormattedMessage id="cancel" />
  //               </Button>
  //             </Grid>
  //             <Grid item>
  //               <Button variant="contained" color="secondary" type="submit">
  //                 <FormattedMessage id="save" />
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </form>
  //     )}
  //   </Formik>
  // );
};

export default ProfileAvatarForm;
