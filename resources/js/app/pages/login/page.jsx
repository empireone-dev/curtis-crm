import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Input from '@/app/layouts/components/input';

export default function LoginPage({ status, canResetPassword }) {
    const { url } = usePage()
    const searchStatus = url.split('=')[1]
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    function formHandler(value, name) {
        setData(name, value)
    }
    return (

        <form onSubmit={submit} className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-blue-700">
                    Sign in to your account
                </h2>
                <img
                    className="mx-auto h-20 w-auto"
                    src="/images/logo.png"
                    alt="Your Company"
                />

            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                {
                    searchStatus == 'invalid' && <div className='text-center text-red-500 text-bold'>
                        You haven't ticket transaction yet. <a href='#'><u>Click Here</u></a>
                    </div>
                }

                <div className="space-y-4" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <Input
                                onChange={formHandler}
                                name="email"
                                value={data.email}
                                label='Email Address'
                                type='email'
                                errorMessage={errors.email}
                            />

                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <Input
                                onChange={formHandler}
                                name="password"
                                value={data.password}
                                label='Password'
                                type='password'
                                errorMessage={errors.password}
                            />
                        </div>
                    </div>
                    <div className='flex gap-3 flex-col'>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-sm bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        <a
                            href='/auth/google'
                            type="submit"
                            className="flex gap-4 w-full justify-center shadow-md border border-blue-500 rounded-sm bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-blue-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <img src='/images/google.png' className='h-6' /> Sign in with Google
                        </a>
                    </div>
                </div>

            </div>
        </form>
    );
}
