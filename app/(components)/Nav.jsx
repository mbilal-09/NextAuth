import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'

const Nav = async () => {
  const session = await getServerSession(options);

  const link_classes = "hover:text-[--primary] transition-all duration-300"
  return (
    <header className="bg-transparent text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className='text-3xl font-bold text-[--primary]'>Mysite</div>
        <div className="flex gap-8">
          <Link className={`${link_classes}`} href={"/"}>Home</Link>
          <Link className={`${link_classes}`} href={"/CreateUser"}>Create User</Link>
          <Link className={`${link_classes}`} href={"/ClientMember"}>Client Member</Link>
          <Link className={`${link_classes}`} href={"/Member"}>Member</Link>
          <Link className={`${link_classes}`} href={"/Public"}>Public</Link>
          {session ? (
            <Link className={`${link_classes}`} href={"/api/auth/signout?callbackUrl=/"}>Log Out</Link>
          ) : (
            <Link className={`${link_classes}`} href={"/api/auth/signin"}>LogIn</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav