'use client';

import { useCallback, useEffect, useState } from 'react';

// material-ui
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material';

import { useFormik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { CoreRef } from 'refs';
import { dispatch, useSelector } from 'store';
import { ReferalSlice } from 'store/slices';
import { openSnackbar } from 'store/slices/snackbar';
import { OrganizationRole } from 'types/organization';
import { ProjectGeneral } from 'types/project';
import { ICreateReferal, LabelValue } from 'types/referal';
import { UsersAddProps } from 'types/user';
import * as Yup from 'yup';

const userTypeOptions = [
  { label: 'Сотрудник', value: 'employee' },
  { label: 'Исполнитель', value: 'executor' }
];

// ==============================|| USER ADD DIALOG ||============================== //

const UserAdd = ({ open, handleCloseDialog }: UsersAddProps) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      role_id: null,
      user_type: null,
      id: null,
      obj: false
    },
    validationSchema: Yup.object().shape({
      email: Yup.mixed().required(),
      role_id: Yup.mixed().required(),
      user_type: Yup.mixed().required(),
      obj: Yup.boolean()
    }),
    onSubmit: async (values: ICreateReferal) => {
      const link = await dispatch(
        ReferalSlice.getToken({
          role_id: values?.role_id?.value!,
          user_type: values?.user_type?.value.toString()!,
          id: !values.obj ? 0 : values.id ?? 0,
          obj: values.obj ? 'market' : 'org'
        })
      ).unwrap();
      navigator.clipboard.writeText(`${CoreRef.origin}/auth/register?ref=${link}`);
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          message: intl.formatMessage({ id: 'ref-copy' }),
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      handleCloseDialog();
      formik.resetForm();
    }
  });
  const [rolesOptions, setRolesOptions] = useState<LabelValue[]>([]);
  const { projects, error: marketError } = useSelector((s) => s.marketplace);
  const { roles } = useSelector((s) => s.organization);

  const handleChange = (value: any, field: any) => {
    formik.setFieldValue(field, value);
  };

  useEffect(() => {
    if (marketError) {
      dispatch(
        openSnackbar({
          open: true,
          message: marketError,
          variant: 'alert',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          close: false,
          alert: {
            color: 'error'
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, marketError]);

  const transformData = useCallback(async () => {
    const mappedProjects = projects.map((el: ProjectGeneral) => ({ label: el.name, value: el.id! }));
    const mappedRoles = roles.map((el: OrganizationRole) => ({ label: el.name, value: el.id }));
    setRolesOptions(mappedRoles);
  }, [projects, roles]);

  useEffect(() => {
    transformData();
  }, [transformData]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <FormattedMessage id="add-user" />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={intl.formatMessage({ id: 'name' })}
                onChange={(e) => handleChange(e.target.value, 'first_name')}
                value={formik.values.first_name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={intl.formatMessage({ id: 'surname' })}
                onChange={(e) => handleChange(e.target.value, 'last_name')}
                value={formik.values.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label={intl.formatMessage({ id: 'email' })}
                onChange={(e) => handleChange(e.target.value, 'email')}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={userTypeOptions}
                filterSelectedOptions
                onChange={(_, j) => handleChange(j, 'user_type')}
                value={formik.values.user_type as any}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.label} label={option.label} />);
                }}
                renderInput={(params) => (
                  <TextField
                    error={Boolean(formik.touched.user_type && formik.errors.user_type)}
                    label={intl.formatMessage({ id: 'select-user-type' })}
                    {...params}
                  />
                )}
              />
              {formik.touched.user_type && formik.errors.user_type && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {formik.errors.user_type}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={rolesOptions}
                filterSelectedOptions
                onChange={(_, j) => handleChange(j, 'role_id')}
                value={formik.values.role_id}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.label}>
                      {option.label}
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.label} label={option.label} />);
                }}
                renderInput={(params) => (
                  <TextField
                    error={Boolean(formik.touched.role_id && formik.errors.role_id)}
                    label={intl.formatMessage({ id: 'select-user-role' })}
                    {...params}
                  />
                )}
              />
              {formik.touched.role_id && formik.errors.role_id && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {formik.errors.role_id}
                </FormHelperText>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <span style={{ marginRight: 8 }}>Выдать доступ к личному кабинету</span>
              <Switch
                checked={formik.values.obj}
                onChange={(e) => handleChange(e.target.checked, 'obj')}
                inputProps={{ 'aria-label': 'checked' }}
              />
            </Grid>
            {formik.values.obj && (
              <>
                <Grid item xs={12}>
                  <Autocomplete
                    // multiple
                    id="tags-outlined"
                    onChange={(e) => handleChange(e, 'id')}
                    value={formik.values.id as any}
                    options={projectsOptions}
                    filterSelectedOptions
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.label}>
                          {option.label}
                        </li>
                      );
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.label} label={option.label} />);
                    }}
                    renderInput={(params) => <TextField label="Выберите маркетплейс" {...params} />}
                  />
                </Grid>
              </>
            )} */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            <FormattedMessage id="create" />
          </Button>
          <Button color="error" onClick={handleCloseDialog}>
            <FormattedMessage id="close" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserAdd;
