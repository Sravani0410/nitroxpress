import React from 'react'

const TabButton = (
    {
        pandingtab,
        id,
        target,
        controls,
        tabRoutFun,
        name,
        PermissionData,
        permissionCheck
    }

) => {
    return (
        <li className="nav-item" role="presentation">
            {PermissionData ==
                permissionCheck && <button
                    className={`nav-link   ${pandingtab ? pandingtab?.activeValue : ""
                        }`}
                    id={id}
                    data-bs-toggle="tab"
                    data-bs-target={target}
                    type="button"
                    role="tab"
                    aria-controls={controls}
                    aria-selected={`${pandingtab ? pandingtab?.booleanValue : "false"
                        }`}
                    onClick={tabRoutFun}
                >
                    {name}
                </button>}
        </li>
    )
}

export default TabButton