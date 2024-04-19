import { useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, Users } from "@/types";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function Dashboard({
    auth,
    users,
}: PageProps<{ users: Users }>) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, setError, reset } =
        useForm({
            nome: "",
            email: "",
            senha: "",
            confSenha: "",
        });

    function handleCreateUser(open: boolean) {
        setShowModal(open);
        reset();
    }

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value;

        if (key === "confSenha" && data.senha !== value) {
            setError("confSenha", "As senhas não conferem");
        } else {
            setError("confSenha", "");
        }
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function submit(e: any) {
        e.preventDefault();
        post("/users-create")
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Usuários
                </h2>
            }
        >
            <Head title="Usuários" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="m-6">
                            <button
                                className="bg-blue-500 rounded-2xl hover:bg-blue-600 text-white py-2 px-4"
                                onClick={() => handleCreateUser(true)}
                            >
                                Criar Usuário
                            </button>
                            <Modal
                                show={showModal}
                                onClose={() => handleCreateUser(false)}
                            >
                                <div className="p-6 text-white">
                                    <h2 className="text-lg font-bold mb-4">
                                        Formulário de Usuário
                                    </h2>
                                    <form onSubmit={submit}>
                                        <div className="">
                                            <InputLabel className="mt-2">
                                                Nome:{" "}
                                            </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="nome"
                                                value={data.nome}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message={errors.nome}
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel className="mt-2">
                                                Email:{" "}
                                            </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="email"
                                                value={data.email}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel className="mt-2">
                                                Senha:{" "}
                                            </InputLabel>
                                            <TextInput
                                                type="password"
                                                className="mt-2  w-full"
                                                id="senha"
                                                value={data.senha}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message={errors.senha}
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel className="mt-2">
                                                Confimar Senha:{" "}
                                            </InputLabel>
                                            <TextInput
                                                type="password"
                                                className="mt-2  w-full"
                                                id="confSenha"
                                                value={data.confSenha}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message={errors.confSenha}
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="py-3 my-1">
                                            <PrimaryButton
                                                type="submit"
                                                className="me-3"
                                                disabled={processing}
                                            >
                                                {" "}
                                                Enviar{" "}
                                            </PrimaryButton>
                                            <SecondaryButton
                                                onClick={() =>
                                                    handleCreateUser(false)
                                                }
                                            >
                                                {" "}
                                                Fechar{" "}
                                            </SecondaryButton>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ul>
                                {users.map((user) => (
                                    <li
                                        key={user.id}
                                        className="border border-blue-500 py-4 rounded-2xl my-3 flex justify-between items-center"
                                    >
                                        <div className="ms-3">
                                            <strong>{user.id}</strong>
                                            {" - "}
                                            {user.name} {" - "}
                                            {user.email}
                                        </div>
                                        <div className="me-3">
                                            <button className="bg-red-600 text-white px-3 py-2 me-2 mb-1 rounded-2xl hover:bg-red-400">Excluir</button>
                                            <button className="bg-yellow-600 text-white px-3 py-2 ms-2 mt-1 rounded-2xl hover:bg-yellow-400">Editar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
