import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { Controller, FieldValues, useForm, UseFormHandleSubmit } from 'react-hook-form'
import Feather from '@expo/vector-icons/Feather'

interface InputModalProps {
    showInput: boolean;
    control: any;
    todoValue: string;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    onSubmit: (data: FieldValues) => void;
    handleShowInput: () => void;
    editingTodo: any;
    setValue: any;
}

const InputModal: React.FC<InputModalProps> = ({ showInput, control, setValue, todoValue, handleSubmit, onSubmit, editingTodo, handleShowInput }) => {

    useEffect(() => {
        if (editingTodo) {
            setValue('todo', editingTodo.title);
        }
    }, [editingTodo]);

    return (
        <View className={`h-14 w-full absolute bottom-4 px-3 flex-row items-center ${showInput ? 'justify-between' : 'justify-end'}`}>

            {showInput &&
                <Animated.View
                    entering={FadeInDown.delay(100).duration(500).springify()}
                    className='w-[85%] h-12'
                >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="w-full h-full bg-white/20 text-white rounded-md pl-4 pr-2 text-[16px]"
                                placeholder="Add To do..."
                                placeholderTextColor='#aaa'
                                onChangeText={onChange}
                                value={value}
                                autoFocus
                            />
                        )}
                        name="todo"
                        defaultValue=""
                    />
                </Animated.View>}

            <View className="w-[15%] flex-row items-center justify-end">
                <TouchableOpacity
                    onPress={todoValue ? handleSubmit(onSubmit) : handleShowInput}
                    activeOpacity={0.9}
                    className={`h-12 w-12 rounded-full items-center justify-center ${showInput ? 'bg-white/20' : 'bg-[#2d2828]'}`}
                >
                    {todoValue ?
                        <Feather name="send" size={22} color="white" style={{ marginEnd: 2, marginTop: 2 }} /> :
                        <Feather name="plus" size={30} color="white"
                            style={{
                                transform: [{ rotate: showInput ? '45deg' : '0deg' }]
                            }}
                        />
                    }
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default InputModal