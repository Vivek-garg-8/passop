import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "/icons/eyecross.png";
            passwordRef.current.type = "ref";
        }
    };

    const savePassword = () => {
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            console.log([...passwordArray, { ...form, id: uuidv4() }]);
            setform({ site: "", username: "", password: "" });
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } else {
            toast('Error: password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    };

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    };

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id == id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="p-3 md:mycontainer min-h-[90.1vh] ">
                <h1 className="text-4xl font-bold text-center ">
                    <span className="text-green-700">&lt;</span>
                    Pass<span className="text-green-500">OP</span>
                    <span className="text-green-700"> /&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center ">
                    Your own Password Manager
                </p>
                <div className="flex flex-col gap-8 text-black items-center ">
                    <input
                        className="rounded-full border border-green-500 w-full p-4 py-1 "
                        type="text"
                        placeholder="Enter website URL"
                        name="site"
                        value={form.site}
                        onChange={handleChange}
                        id="site"
                    />
                    <div className="flex md:flex-row flex-col w-full gap-8 ">
                        <input
                            className="rounded-full border w-full border-green-500 p-4 py-1 "
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            id="username"
                        />
                        <div className="relative">
                            <input
                                className="rounded-full border w-full border-green-500 p-4 py-1 "
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                id="password"
                            />
                            <span
                                className="absolute right-[3px] top-[4px] cursor-pointer"
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    className="p-1"
                                    src="/icons/eye.png"
                                    alt="eye"
                                    width={26}
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border border-green-500  "
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className=" py-2 border border-white text-center">
                                                <div className="lordiconcopy flex justify-center items-center ">
                                                    <a href={item.site} target="_blank">
                                                        {item.site}
                                                    </a>
                                                    <div className="size-7 cursor-pointer " onClick={() => { copyText(item.site) }} >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingTop: "3px",
                                                                paddingLeft: "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" py-2 border border-white text-center">
                                                <div className="lordiconcopy flex justify-center items-center ">
                                                    {item.username}
                                                    <div className="size-7 cursor-pointer " onClick={() => { copyText(item.username) }} >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingTop: "3px",
                                                                paddingLeft: "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" py-2 border border-white text-center">
                                                <div className="lordiconcopy flex justify-center items-center ">
                                                    {"*".repeat(item.password.length)}
                                                    <div className="size-7 cursor-pointer " onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingTop: "3px",
                                                                paddingLeft: "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" py-2 border border-white text-center">
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
