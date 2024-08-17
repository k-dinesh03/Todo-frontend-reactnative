import { useContext, useState } from "react";
import { StatusBar, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

import Animated, { FadeInUp } from 'react-native-reanimated'
import { TextInput } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import axios from "axios";
import { api_link } from "@/config";
import { GlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClientContext } from "@/context/ClientContext";

const SignIn = () => {

    const { setLoading } = useContext(GlobalContext);
    const { setToken, setClientId } = useContext(ClientContext);

    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('E-Mail is required'),
        password: yup
            .string()
            .required('Password is required')
    });

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await axios.post(`${api_link}/users/signin`, data);

            ToastAndroid.show(response.data.message, 3000);

            const token = response.data.token;
            await AsyncStorage.setItem('TODO_TOKEN', token);
            setToken(token);

            const id = response.data.user_id;
            await AsyncStorage.setItem('TODO_USERID', id);
            setClientId(id);

        } catch (error: any) {
            if (error.response) {
                const responseData = error.response.data.message;
                console.log(responseData);
                if (responseData === 'User not found!') setError('email', { type: 'manual', message: responseData });
                else setError('password', { type: 'manual', message: responseData });
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">

            <StatusBar backgroundColor='#000000' barStyle="light-content" />

            <View className="h-full w-full py-3 px-3 space-y-10">

                <Text className="text-white text-xl tracking-wide font-semibold text-center">Sign In</Text>

                <View className="space-y-5">

                    <Animated.View entering={FadeInUp.delay(400).duration(800).springify()} className='space-y-2'>

                        <Text className='text-lg tracking-wider text-white'>E-Mail Id</Text>
                        <View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className='w-full h-[55px] bg-transparent rounded-md text-[16px] text-white pl-4 tracking-wide border-[1px] border-[#a8a8a8]'
                                        placeholder='E-mail'
                                        placeholderTextColor='#a8a8a8'
                                        inputMode='email'
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name='email'
                                defaultValue=""
                            />
                            {errors.email?.message && <Text className="text-red-400">* {errors.email?.message}</Text>}
                        </View>

                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(300).duration(800).springify()} className='space-y-2'>

                        <Text className='text-lg tracking-wider text-white'>Password</Text>
                        <View>
                            <View className='flex-row items-center justify-between'>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            className='w-full h-[55px] bg-transparent rounded-md text-[16px] text-white pl-4 tracking-wide border-[1px] border-[#a8a8a8]'
                                            placeholder='Password'
                                            placeholderTextColor='#a8a8a8'
                                            secureTextEntry={!showPassword}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="password"
                                    defaultValue=""
                                />
                                <TouchableOpacity activeOpacity={0.9} onPress={() => setShowPassword(!showPassword)} className='absolute right-0 h-full px-3 items-center justify-center z-10'>
                                    <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={22} color='white' />
                                </TouchableOpacity>
                            </View>
                            {errors.password?.message && <Text className="text-red-400">* {errors.password?.message}</Text>}
                        </View>

                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(200).duration(800).springify()} className='flex-row items-center space-x-2'>
                        <Text className="text-white tracking-wide text-[15px]">Don't have an account ?</Text>
                        <Link href='/(auth)/signup'>
                            <Text className="text-white tracking-wide text-[15px] underline">SignUp</Text>
                        </Link>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(100).duration(800).springify()}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="h-[55px] w-full items-center justify-center border-[0.5px] border-white rounded-md"
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text className="text-white tracking-wider text-lg">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>

            </View>

        </View>
    );
};

export default SignIn;