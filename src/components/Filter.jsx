import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from 'react-icons/bs';


const Filter = ({data, setFilteredData, locations,  setIsFilterClicked}) => {
    const[orderBy, setOrderBy] = useState("");

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

    const handleSort = (column) => {
        setOrderBy(column.label)
        const sortedData = [...data].sort((a, b) => {
          return a[column.columnName].localeCompare(b[column.columnName]);
        });
        setFilteredData(sortedData);
      };

    return (
        <div className="flex gap-8 items-center">
            <Menu>
                <MenuButton as={Button} rightIcon={<BsChevronDown/>} className="m-4">ORDER BY{orderBy && ` : ${orderBy.toLocaleUpperCase()}`}</MenuButton>
                <MenuList>
                    {columns?.map(column =>(
                        <MenuItem key={column.label} onClick={() => handleSort(column)}>{column.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>

            {locations?.length > 0 && (
                <div className="flex items-center gap-2">

                    <div className="flex gap-2">
                        {locations?.map(location => (
                            <p className="font-semibold bg-slate-100 p-3 rounded" key={location}>{location}</p>
                        ))}
                    </div>

                    <Button colorScheme='teal' size='xs' onClick={() => setIsFilterClicked(true)}>FILTER</Button>
                </div>
            )}     
            

        </ div>
    );

}

export default Filter