import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const handle = {
	// In the handle export, we could add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	i18n: ['index'],
};

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const { t, ready, i18n } = useTranslation('index');

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Welcome to NewDay
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						Helping people move forward with credit
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id='firstName' isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Box>
							<Box>
								<FormControl id='lastName'>
									<FormLabel>Last Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Box>
						</HStack>
						<FormControl id='email' isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type='email' />
						</FormControl>
						<FormControl id='password' isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} />
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already a user? <Link color={'blue.400'}>Login</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
