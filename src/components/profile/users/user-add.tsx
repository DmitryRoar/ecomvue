'use client';

import { useEffect, useState } from 'react';

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
  Switch,
  TextField
} from '@mui/material';

// project imports
import { useFormik } from 'formik';
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

const UserAdd = ({ open, handleCloseDialog, users }: UsersAddProps) => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      role_id: null,
      user_type: null,
      id: null,
      obj: false
      // projects: [],
      // rights: [],
    },
    validationSchema: Yup.object().shape({
      // first_name: Yup.string(),
      // last_name: Yup.string(),
      // email: Yup.string().email('Неверный формат почты'),
      role_id: Yup.mixed().required('Роль обязательна'),
      user_type: Yup.mixed().required('Тип пользователя обязателен'),
      obj: Yup.boolean()
      // id: Yup.lazy((value) => (value ? Yup.number().required('Поле id обязательное') : Yup.number()))
    }),
    onSubmit: (values: ICreateReferal) => {
      console.log({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        role_id: values?.role_id?.value,
        user_type: values?.user_type?.value,
        id: !values.obj ? 0 : values.id ?? 0,
        obj: values.obj ? 'market' : 'org'
      });
      dispatch(
        ReferalSlice.getToken({
          role_id: values?.role_id?.value!,
          user_type: values?.user_type?.value.toString()!,
          id: !values.obj ? 0 : values.id ?? 0,
          obj: values.obj ? 'market' : 'org'
        })
      );
      handleCloseDialog();
      formik.resetForm();
    }
  });
  const [rolesOptions, setRolesOptions] = useState<LabelValue[]>([]);
  const [projectsOptions, setProjectsOptions] = useState<LabelValue[]>([]);
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
  }, [dispatch, marketError]);

  useEffect(() => {
    const fetchData = async () => {
      const mappedProjects = await projects.map((el: ProjectGeneral) => ({ label: el.name, value: el.id! }));
      setProjectsOptions(mappedProjects);
      const mappedRoles = await roles.map((el: OrganizationRole) => ({ label: el.name, value: el.id }));
      setRolesOptions(mappedRoles);
    };

    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Имя (Опционально)"
                onChange={(e) => handleChange(e.target.value, 'first_name')}
                value={formik.values.first_name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Фамилия (Опционально)"
                onChange={(e) => handleChange(e.target.value, 'last_name')}
                value={formik.values.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Почта (Опционально)"
                onChange={(e) => handleChange(e.target.value, 'email')}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={userTypeOptions}
                filterSelectedOptions
                onChange={(e, j) => handleChange(j, 'user_type')}
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
                    label="Выберите тип пользователя"
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
                onChange={(e, j) => handleChange(j, 'role_id')}
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
                    label="Выберите роль пользователя"
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
            <Grid item xs={12}>
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
                {/* <Grid item xs={12}>
                  <Autocomplete
                    // multiple
                    id="tags-outlined"
                    options={projectsOptions}
                    value={formik.values.id as any}
                    onChange={(e, j) => {
                      console.log('e:', e);
                      console.log('j', j);
                    }}
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
                    renderInput={(params) => <TextField label="Выберите маркетплейсы" {...params} />}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={functoolsOptions}
                    filterSelectedOptions
                    onChange={(e) => handleChange(e, 'rights')}
                    value={formik.values.rights}
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
                    renderInput={(params) => <TextField label="Выберите права" {...params} />}
                  />
                </Grid> */}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Создать
          </Button>
          <Button color="error" onClick={handleCloseDialog}>
            Закрыть
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserAdd;
