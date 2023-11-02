import { FiGithub } from 'react-icons/fi'
import './Footer.css'

export function Footer () {
    return (
        <footer>
            <a 
                href="https://github.com/GandalfTheBlack16/"
                target='_blank'
            >
                Developed by: GandalfTheBlack
                <FiGithub 
                    size='20px'
                />
            </a>
        </footer>
    )
}