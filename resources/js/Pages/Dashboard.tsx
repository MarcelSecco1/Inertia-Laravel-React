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

export default function Dashboard({
    auth,
    users,
}: PageProps<{ users: Users }>) {
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confSenha: "",
    });

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        router.post("/users", values);
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
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={() => setShowModal(true)}
                            >
                                Criar Usuário
                            </button>
                            <Modal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                            >
                                <div className="p-6 text-white">
                                    <h2 className="text-lg font-bold mb-4">
                                        Formulário de Usuário
                                    </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="">
                                            <InputLabel>Nome: </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="nome"
                                                value={values.nome}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message="Teste"
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel>Email: </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message="Teste"
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel>Senha: </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="email"
                                                value={values.senha}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message="Teste"
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="">
                                            <InputLabel>
                                                Confimar Senha:{" "}
                                            </InputLabel>
                                            <TextInput
                                                className="mt-2  w-full"
                                                id="confSenha"
                                                value={values.confSenha}
                                                onChange={handleChange}
                                            />
                                            <InputError
                                                message="Teste"
                                                className="mb-2"
                                            ></InputError>
                                        </div>
                                        <div className="py-3 my-1">
                                            <PrimaryButton
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                className="me-3"
                                            >
                                                {" "}
                                                Enviar{" "}
                                            </PrimaryButton>
                                            <SecondaryButton
                                                onClick={() =>
                                                    setShowModal(false)
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
                                    <li key={user.id}>
                                        <strong>{user.id}</strong>
                                        {" - "}
                                        {user.name} {" - "}
                                        {user.email}
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
