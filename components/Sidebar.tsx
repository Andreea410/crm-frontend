export default function Sidebar() {
    return (
        <aside className="hidden shrink-0 p-12 w-56 bg-[#2d3561] overflow-y-auto md:block">
            <NavItem href="/" label="Dashboard" iconPath="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
            <NavItem
                href="/organizations"
                label="Organizations"
                iconPath="M7 0h86v100H57.108V88.418H42.892V100H7V0zm9 64h11v15H16V64zm57 0h11v15H73V64zm-19 0h11v15H54V64zm-19 0h11v15H35V64zM16 37h11v15H16V37zm57 0h11v15H73V37zm-19 0h11v15H54V37zm-19 0h11v15H35V37zM16 11h11v15H16V11zm57 0h11v15H73V11zm-19 0h11v15H54V11zm-19 0h11v15H35V11z"
                fillRule="evenodd"
            />
            <NavItem
                href="/contacts"
                label="Contacts"
                iconPath="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
            />
            <NavItem
                href="/reports"
                label="Reports"
                iconPath="M4 16H0V6h20v10h-4v4H4v-4zm2-4v6h8v-6H6zM4 0h12v5H4V0zM2 8v2h2V8H2zm4 0v2h2V8H6z"
            />
        </aside>
    );
}

function NavItem({
                     href,
                     label,
                     iconPath,
                     fillRule,
                 }: {
    href: string;
    label: string;
    iconPath: string;
    fillRule?: string;
}) {
    return (
        <div className="mb-4">
            <a className="group flex items-center py-3" href={href}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="mr-2 w-4 h-4 fill-indigo-400 group-hover:fill-white"
                    fillRule={fillRule}
                >
                    <path d={iconPath}></path>
                </svg>
                <div className="text-indigo-300 group-hover:text-white">{label}</div>
            </a>
        </div>
    );
}
