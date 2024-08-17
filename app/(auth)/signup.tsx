import { useContext, useState } from "react";
import { ScrollView, StatusBar, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'

import Animated, { FadeInUp } from 'react-native-reanimated'
import { TextInput } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { api_link } from "@/config";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClientContext } from "@/context/ClientContext";
import { GlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {

    const { setToken, setClientId } = useContext(ClientContext);
    const { setLoading } = useContext(GlobalContext);
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object().shape({
        fname: yup
            .string()
            .required('First Name is required')
            .matches(/^[a-zA-Z ]+$/, 'First Name must contain only letters')
            .min(3, 'First Name must be at least 3 characters'),
        lname: yup
            .string()
            .required('Last Name is required')
            .matches(/^[a-zA-Z ]+$/, 'Last Name must contain only letters')
            .min(1, 'Last Name must be at least 1 character'),
        age: yup
            .number()
            .required('Age is required')
            .min(18, 'Age must be greater than or equal to 18'),
        email: yup
            .string()
            .email('Invalid Email Format')
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid Email Format',
            ),
        password: yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/,
                'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'
            )
            .min(8, 'Password must be at least 8 characters'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await axios.post(`${api_link}/users/register`, {
                firstName: data.fname,
                lastName: data.lname,
                age: data.age,
                email: data.email,
                password: data.password,
            })
            ToastAndroid.show(response.data.message, 3000);
            console.log(response.data.message);

            const token = response.data.token;
            await AsyncStorage.setItem('TODO_TOKEN', token);
            setToken(token);

            const id = response.data.user_id;
            await AsyncStorage.setItem('TODO_USERID', id);
            setClientId(id);

            reset();

        } catch (error: any) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">

            <StatusBar backgroundColor='#000000' barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

                <View className="h-full w-full py-3 px-3 space-y-10">

                    <Text className="text-white text-xl tracking-wide font-semibold text-center">Sign Up</Text>

                    <View className="space-y-4">

                        <Animated.View entering={FadeInUp.delay(400).duration(800).springify()} className='space-y-2'>

                            <Text className='text-lg tracking-wider text-white'>First Name</Text>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            className='w-full h-[55px] bg-transparent rounded-md text-[16px] text-white pl-4 tracking-wide border-[1px] border-[#a8a8a8]'
                                            placeholder='First Name'
                                            placeholderTextColor='#a8a8a8'
                                            inputMode='text'
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name='fname'
                                    defaultValue=""
                                />
                            </View>
                            {errors.fname?.message && <Text className="text-red-400">* {errors.fname?.message}</Text>}

                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(400).duration(800).springify()} className='space-y-2'>

                            <Text className='text-lg tracking-wider text-white'>Last Name</Text>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            className='w-full h-[55px] bg-transparent rounded-md text-[16px] text-white pl-4 tracking-wide border-[1px] border-[#a8a8a8]'
                                            placeholder='Last Name'
                                            placeholderTextColor='#a8a8a8'
                                            inputMode='text'
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name='lname'
                                    defaultValue=""
                                />
                            </View>
                            {errors.lname?.message && <Text className="text-red-400">* {errors.lname?.message}</Text>}

                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(400).duration(800).springify()} className='space-y-2'>

                            <Text className='text-lg tracking-wider text-white'>Age</Text>
                            <View>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            className='w-full h-[55px] bg-transparent rounded-md text-[16px] text-white pl-4 tracking-wide border-[1px] border-[#a8a8a8]'
                                            placeholder='Age'
                                            placeholderTextColor='#a8a8a8'
                                            inputMode='numeric'
                                            onChangeText={onChange}
                                            value={value?.toString()}
                                        />
                                    )}
                                    name='age'
                                />
                            </View>
                            {errors.age?.message && <Text className="text-red-400">* {errors.age?.message}</Text>}

                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(400).duration(800).springify()} className='space-y-2'>

                            <Text className='text-lg tracking-wider text-white'>E-Mail</Text>
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
                            </View>
                            {errors.email?.message && <Text className="text-red-400">* {errors.email?.message}</Text>}

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
                            </View>
                            {errors.password?.message && <Text className="text-red-400">* {errors.password?.message}</Text>}

                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(100).duration(800).springify()}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                className="h-[55px] w-full items-center justify-center border-[0.5px] border-white rounded-md"
                                onPress={handleSubmit(onSubmit)}
                            >
                                <Text className="text-white tracking-wider text-lg">Register</Text>
                            </TouchableOpacity>
                        </Animated.View>

                    </View>

                </View>

            </ScrollView>

        </View>
    );
};

export default SignUp;