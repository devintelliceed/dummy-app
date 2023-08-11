// outsource dependencies
import { Formik } from "formik";
import { memo, useCallback } from "react";
import { Button, Text } from "@rneui/themed";
import { View, StyleSheet, Image } from "react-native";
// local dependencies
import { useController } from "./controller";
import Screen from "../../components/screen";
import TextInput from "../../components/text-input";
import { COLOR } from "../../constants/root.theme";

// configure
const PROFILE_FORM = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
};

// helpers 
const toCapitalized = string => (typeof string === 'string') ? `${string.charAt(0).toUpperCase()}${string.slice(1).toLocaleLowerCase()}` : string;

const Profile = () => {
    const [{ user, initialized, disabled }, { initialize, submit }] = useController();
    const submitHandler = useCallback(formData => submit(formData), [submit]);
    return <Screen init={initialize} initialized={initialized} style={styles.container}>
        <Formik
            enableReinitialize
            initialValues={user}
            onSubmit={submitHandler}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
            }) => <View style={styles.formContainer}>
                    <Text style={{ alignSelf: 'center', marginBottom: 5, color: COLOR.DARK_GREY.hex() }} h3 >Profile {values?.name}</Text>
                    <Image style={{ height: 100, width: 100, borderRadius: 100, alignSelf: 'center' }} source={{ uri: values?.coverImage?.url }} resizeMode="cover" />
                    <TextInput
                        error={errors}
                        touched={touched}
                        label="First Name"
                        variant="standard"
                        disabled={!disabled}
                        name={PROFILE_FORM.FIRST_NAME}
                        containerStyle={styles.containerStyle}
                        value={values&&values[PROFILE_FORM.FIRST_NAME]}
                        onChangeText={handleChange(PROFILE_FORM.FIRST_NAME)}
                    />
                    <TextInput
                        error={errors}
                        label="Last Name"
                        touched={touched}
                        variant="standard"
                        disabled={!disabled}
                        name={PROFILE_FORM.LAST_NAME}
                        containerStyle={styles.containerStyle}
                        value={values&&values[PROFILE_FORM.LAST_NAME]}
                        onChangeText={handleChange(PROFILE_FORM.LAST_NAME)}
                    />
                    <Button
                        fullWidth
                        title="Submit"
                        type="outline"
                        loading={disabled}
                        onPress={handleSubmit}
                        titleStyle={styles.titleStyle}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        loadingProps={{ size: 'small', color: 'white' }}
                    />
                </View>}
        </Formik>
    </Screen>;
};

export default memo(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
    },
    containerStyle: {
        height: 50,
        width: '100%',
        marginVertical: 30,
    },
    formContainer: {
        margin: 16,
        width: '90%'
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: COLOR.GREEN.hex(),
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 300,
        color: COLOR.WHITE.hex()
    }
});
