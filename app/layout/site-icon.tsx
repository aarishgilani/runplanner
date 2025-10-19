export default function SiteIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4 12L7 9L10 12L13 9L16 12L19 9" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 16H8L10 10L14 18L16 14H20" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}