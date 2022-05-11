import Link from "next/link"
import Image from "next/image"
import logo from '../public/natLogo.png'

const NavBar = ({account}) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                 <Link href='/'><Image src={logo} alt="Disney Logo" width={120} height={80}/></Link>
            </div>
           
            <div className="account-info">
            <p>Välkommen {account.username}</p>
            <img className="avatar" src={account.avatar.url}/>
            </div>
        </div>
    )
}

export default NavBar