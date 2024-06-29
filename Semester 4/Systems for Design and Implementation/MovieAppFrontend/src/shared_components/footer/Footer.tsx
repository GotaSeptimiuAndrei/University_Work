import './Footer.css';

export function Footer() {
    return (
        <div className='footer' data-testid='footer-test-id'>
            <div className='footer-text' data-testid='footer-inner'>
                <div id='footer-text'>Created by Gota Andrei</div>
            </div>
        </div>
    );
}