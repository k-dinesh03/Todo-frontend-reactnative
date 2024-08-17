import { TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

interface EditModalProps {
    handleShowEditModal: () => void;
    handleDeleteTodo: () => void;
    handleEditTodo: () => void;
    handleTodoCompleted: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ handleShowEditModal, handleDeleteTodo, handleEditTodo, handleTodoCompleted }) => {
    return (
        <Animated.View
            entering={FadeIn.delay(100).duration(1200).springify()}
            exiting={FadeOut.duration(100).springify()}
            className="h-14 w-52 flex-row items-center bg-white/20 justify-evenly rounded-sm absolute z-50 self-end bottom-1"
        >
            <TouchableOpacity
                onPress={handleTodoCompleted}
                activeOpacity={0.9}
                className="w-12 h-12 flex-row items-center justify-center bg-white/20 rounded-sm"
            >
                <FontAwesome6 name="check" size={21} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleEditTodo}
                activeOpacity={0.9}
                className="w-12 h-12 flex-row items-center justify-center bg-white/20 rounded-sm"
            >
                <FontAwesome6 name="edit" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleDeleteTodo}
                activeOpacity={0.9}
                className="w-12 h-12 flex-row items-center justify-center bg-white/20 rounded-sm"
            >
                <FontAwesome name="trash-o" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleShowEditModal}
                activeOpacity={0.9}
                className="w-12 h-12 flex-row items-center justify-center bg-white/20 rounded-sm"
            >
                <Feather name="x" size={26} color="white" />
            </TouchableOpacity>

        </Animated.View>
    )
}

export default EditModal