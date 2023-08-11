// outsource dependencies
import * as yup from 'yup';
import { Formik } from 'formik';
import { memo, useCallback } from 'react';
import { Button, Text } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

// local dependencies
import Screen from '../../components/screen';
import { COLOR } from '../../constants/root.theme';
import TextInput from '../../components/text-input';
import { useController, SIGNUP_INPUTS } from './controller';

// Validation
const validationSchema = () => yup.object().shape({
    [SIGNUP_INPUTS.USERNAME]: yup.string().required('Email address is required').email('Invalid email address'),
    [SIGNUP_INPUTS.PASSWORD]: yup.string().required('Password is required').min(7, 'Password must contain at least 7 symbol character'),
    [SIGNUP_INPUTS.COFIRM_PASSWORD]: yup.string()
       .oneOf([yup.ref(SIGNUP_INPUTS.PASSWORD), null], 'Passwords must match')
  });

const SignIn = () => {
    const [{ initialValues, disabled, error }, { submit }] = useController();
    const submitHandler = useCallback(formData => submit(formData), [submit]);
    return <Screen style={styles.container}>
        <Formik
            onSubmit={submitHandler}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
            }) => <View style={styles.formContainer}>
                    <TextInput
                        label="Email"
                        error={errors}
                        touched={touched}
                        variant="standard"
                        disabled={!disabled}
                        name={SIGNUP_INPUTS.USERNAME}
                        value={values[SIGNUP_INPUTS.USERNAME]}
                        onChangeText={handleChange(SIGNUP_INPUTS.USERNAME)}
                    />
                    <TextInput
                        error={errors}
                        label="Password"
                        touched={touched}
                        variant="standard"
                        disabled={!disabled}
                        name={SIGNUP_INPUTS.PASSWORD}
                        value={values[SIGNUP_INPUTS.PASSWORD]}
                        onChangeText={handleChange(SIGNUP_INPUTS.PASSWORD)}
                    />
                    <TextInput
                        error={errors}
                        touched={touched}
                        variant="standard"
                        disabled={!disabled}
                        label="Confirm Password"
                        name={SIGNUP_INPUTS.COFIRM_PASSWORD}
                        value={values[SIGNUP_INPUTS.COFIRM_PASSWORD]}
                        onChangeText={handleChange(SIGNUP_INPUTS.COFIRM_PASSWORD)}
                    />
                    <Button
                        fullWidth
                        title="SIGN UP"
                        type="outline"
                        loading={disabled}
                        onPress={handleSubmit}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            borderRadius: 5,
                            backgroundColor: COLOR.GREEN.hex(),
                        }}
                        containerStyle={{
                            height: 50,
                            width: 200,
                            marginVertical: 10,
                            marginHorizontal: 50,
                        }}
                        titleStyle={{ fontWeight: 300, fontSize: 14, color: COLOR.WHITE.hex() }}
                    />
                    {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
                </View>}
        </Formik>
    </Screen>
};

export default memo(SignIn);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE.hex()
    },
    formContainer: {
        margin: 16,
        width: '80%'
    }
});
