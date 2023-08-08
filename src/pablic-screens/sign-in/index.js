// outsource dependencies
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button } from '@rneui/themed';
import { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

// local dependencies
import Screen from '../../components/screen';
import { SIGN_UP } from '../../constants/routes';
import { COLOR } from '../../constants/root.theme';
import TextInput from '../../components/text-input';
import { useController, AUTH_INPUTS } from './controller';

// Validation
const validationSchema = () => yup.object().shape({
    username: yup.string().required('Email address is required').email('Invalid email address'),
});

const SignIn = ({ navigation }) => {
    const [{ initialValues, disabled }, { submit }] = useController();
    const submitHandler = useCallback(formData => submit(formData), [submit]);
    const toSignUP = useCallback(() => navigation.push(SIGN_UP), [navigation]);
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
                        value={values.username}
                        name={AUTH_INPUTS.USERNAME}
                        onChangeText={handleChange(AUTH_INPUTS.USERNAME)}
                    />
                    <TextInput
                        error={errors}
                        label="Password"
                        touched={touched}
                        variant="standard"
                        disabled={!disabled}
                        value={values.password}
                        name={AUTH_INPUTS.PASSWORD}
                        onChangeText={handleChange(AUTH_INPUTS.PASSWORD)}
                    />
                    <Button
                        fullWidth
                        title="LOGIN"
                        type="outline"
                        loading={disabled}
                        onPress={handleSubmit}
                        titleStyle={styles.titleStyle}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        loadingProps={{ size: 'small', color: 'white' }}
                    />
                    <Button
                        fullWidth
                        type="outline"
                        title="SIGN UP"
                        onPress={toSignUP}
                        titleStyle={styles.titleStyle}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        loadingProps={{ size: 'small', color: 'white' }}
                    />
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
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: COLOR.GREEN.hex(),
    },
    containerStyle: {
        height: 50,
        width: 200,
        marginVertical: 10,
        marginHorizontal: 50,
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 300,
        color: COLOR.WHITE.hex()
    }
});
