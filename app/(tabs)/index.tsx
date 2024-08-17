import { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { useForm } from 'react-hook-form';
import InputModal from "@/components/InputModal";

import EditModal from "@/components/EditModal";
import Animated, { FadeInUp } from 'react-native-reanimated'
import axios from 'axios'
import { api_link } from "@/config";
import { ClientContext } from "@/context/ClientContext";

interface Todo {
	_id: string;
	title: string;
	completed: boolean;
}

export default function HomeScreen() {

	const { clientId } = useContext(ClientContext);

	const [showInput, setShowInput] = useState(false);
	const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
	const [editingTodo, setEditingTodo] = useState<any | null>(null);

	const handleShowEditModal = (index: number) => setActiveTodoIndex(index === activeTodoIndex ? null : index);
	const handleShowInput = () => setShowInput(!showInput);

	const [todos, setTodos] = useState<any[]>([]);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		reset
	} = useForm({});

	const todoValue = watch("todo");

	const onSubmit = async (data: any) => {
		try {
			if (editingTodo) {
				const response = await axios.put(`${api_link}/todo/${clientId}/${editingTodo._id}`, {
					todo: data.todo.trim()
				});
				ToastAndroid.show(response.data.message, 3000);
				setTodos((prevTodos: any) =>
					prevTodos.map((todo: any) =>
						todo._id === editingTodo._id ? response.data.updatedTodo : todo
					)
				);
			}
			else {
				const response = await axios.post(`${api_link}/todo/create/${clientId}`, {
					todo: data.todo.trim()
				});
				ToastAndroid.show(response.data.message, 3000);
				setTodos((prevTodos: any) =>
					[...prevTodos, response.data.todos]
				);
			}
			setEditingTodo(null);
			reset();

		} catch (error) {
			console.log(error);
		}
	}

	const handleDeleteTodo = async (id: string) => {
		try {
			const response = await axios.delete(`${api_link}/todo/${clientId}/${id}`);
			ToastAndroid.show(response.data.message, 3000);
			setTodos((prevTodos: any) =>
				prevTodos.filter((todo: Todo) => todo._id !== id)
			);
			setActiveTodoIndex(null);

		} catch (error) {
			console.log(error);
		}
	}

	const handleEditTodo = (todo: Todo) => {
		setEditingTodo({ _id: todo?._id, title: todo?.title });
		setShowInput(true);
		setActiveTodoIndex(null);
	}

	const handleTodoCompleted = async (id: string) => {
		try {
			const response = await axios.put(`${api_link}/todo/complete/${clientId}/${id}`);
			ToastAndroid.show(response.data.message, 3000);

			setTodos((prevTodos: any) =>
				prevTodos.map((todo: Todo) =>
					todo._id === id ? { ...todo, completed: true } : todo
				)
			);
			setActiveTodoIndex(null);

		} catch (error) {
			console.log(error);
		}
	};


	const getAllTodos = async () => {
		try {
			const response = await axios.get(`${api_link}/todo/alltodos/${clientId}`);
			setTodos(response.data);

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (clientId) getAllTodos();
	}, [clientId])

	return (
		<View className="flex-1 bg-black">

			<StatusBar backgroundColor='#000000' barStyle="light-content" />

			<ScrollView showsVerticalScrollIndicator={false} className={`flex-1 ${showInput ? 'mb-20' : ''}`}>

				<View className='w-full space-y-6 py-3 px-3'>

					<View className="space-y-2">

						<Text className="text-white text-center tracking-wide font-semibold text-xl">
							TO DO
						</Text>

						<View className="w-3/4 self-center">
							<Text className="text-white text-center tracking-wider text-md underline">
								Mark your thoughts for later, ensuring nothing is forgotten
							</Text>
						</View>

					</View>

					<View className='w-full space-y-2'>
						{todos.map((todo: any, index: number) => (
							<Animated.View key={index} className={`w-full ${activeTodoIndex === index ? '-mb-2' : ''}`} entering={FadeInUp.delay(100 * index).duration(1200).springify()}>

								<TouchableOpacity
									activeOpacity={0.9}
									onLongPress={() => handleShowEditModal(index)}
									className={`w-full h-14 flex-row items-center justify-center rounded-sm ${todo?.completed ? 'bg-emerald-600/80' : 'bg-white/20'}`}
								>
									<Text className="text-white text-[17px] font-regular tracking-wide">{todo?.title}</Text>
								</TouchableOpacity>

								{activeTodoIndex === index && (
									<View className="mt-16">
										<EditModal
											handleShowEditModal={() => handleShowEditModal(index)}
											handleDeleteTodo={() => handleDeleteTodo(todo?._id)}
											handleEditTodo={() => handleEditTodo(todo)}
											handleTodoCompleted={() => handleTodoCompleted(todo?._id)}
										/>
									</View>
								)}

							</Animated.View>
						))}
					</View>

				</View>

			</ScrollView>

			<InputModal
				showInput={showInput}
				control={control}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				handleShowInput={handleShowInput}
				todoValue={todoValue}
				editingTodo={editingTodo}
				setValue={setValue}
			/>

		</View>
	);
}

