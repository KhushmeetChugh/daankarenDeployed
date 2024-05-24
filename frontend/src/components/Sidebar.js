import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/nav-styles.css";
import '../CSS/sidebar.css'

const Sidebar = ({ userId, role, setIsLoginClicked, isSidebarOpen, setIsSidebarOpen }) => {
    const [uid, setUid] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleName, SetRoleName] = useState("");
    useEffect(
        () => {
            const checkCookies = () => {
                const cookies = document.cookie;

                if (!cookies.includes("Login")) {
                    console.error("Cookies are not  present");
                    setIsLoggedIn(false);
                    SetRoleName("");
                } else {
                    setIsLoggedIn(true);
                    // console.log("login=" + isLoggedIn);
                    // console.log("role=" + role);
                    SetRoleName(role);
                }

                if (userId) {
                    setUid(userId); // Update uid when userId changes
                }
            };

            checkCookies();
        },
        [userId],
        [isLoggedIn],
        [role]
    );
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const sidebar = document.querySelector('.sidebar');
            const toggleButton = document.querySelector('.sidebar-toggle'); // Find the toggle button

            // Check if the clicked target is neither inside the sidebar nor the toggle button
            if (sidebar && !sidebar.contains(event.target) && toggleButton && !toggleButton.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setIsSidebarOpen]);

    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <ul>
                    {roleName === "admin" && (
                        <li >
                            <Link
                                exact="true"
                                to="/"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                AdminDashboard
                            </Link>
                        </li>
                    )}
                    <li >
                        <Link
                            to="/ViewCampaigns"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            Campaigns
                        </Link>
                    </li>
                    {roleName !== "admin" && (
                        <li >
                            <Link
                                to="/NewCampaignForm"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Request Campaign
                            </Link>
                        </li>
                    )}
                    {roleName !== "admin" && (
                        <li>
                            <Link
                                to="/PartnerPage"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Our Partners
                            </Link>
                        </li>
                    )}
                    {role !== "admin" && (
                        <li >
                            <Link
                                to="/registerOrg"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Register Organisation
                            </Link>
                        </li>
                    )}

                    {roleName !== "admin" && (
                        <li >
                            <Link
                                to="/Volunteer"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Volunteer
                            </Link>
                        </li>
                    )}

                    {roleName !== "admin" && (
                        <li>
                            <Link
                                to="/DonationPage"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Donate
                            </Link>
                        </li>
                    )}
                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/PendingTickets"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Pending Tickets
                            </Link>
                        </li>
                    )}

                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/VerifyNgoRegistrations"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Organisation requests
                            </Link>
                        </li>
                    )}

                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/PendingDonateItems"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                Donate Items
                            </Link>
                        </li>
                    )}
                </ul>
            </div >
        </>
    );
};

export default Sidebar;
