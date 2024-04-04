import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from 'react-icons/bs';


const Filter = ({data, setFilteredData}) => {
    const columns=[
        {
            label: "Name",
            columnName: "Column 1"
        },
        {
            label: "Location",
            columnName: "Column 2"
        },
        {
            label: "Card Number",
            columnName: "Column 3"
        },
        {
            label: "SKU",
            columnName: "Column 5"
        },
        {
            label: "Company",
            columnName: "Column 6"
        }
    ];

    const handleSort = (columnName) => {
        const sortedData = [...data].sort((a, b) => {
          return a[columnName].localeCompare(b[columnName]);
        });
        setFilteredData(sortedData);
      };

    return (
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<BsChevronDown/>} className="m-4">{ 'Filter Table'}</MenuButton>
                <MenuList>
                    {columns?.map(column =>(
                        <MenuItem key={column.label} onClick={() => handleSort(column.columnName)}>{column.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );

}

export default Filter