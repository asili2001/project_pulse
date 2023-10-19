import React, { ReactNode, useEffect, useState } from "react";
import { Input } from ".";

export interface IFilterableItem {
    id: number;
    content: ReactNode;
    searchKeys: string[];
}

interface IProps {
    data: IFilterableItem[];
    selectable?: boolean;
    onSelectedItemsChange?: (selectedItems: number[]) => void;
    className?: string;
}

const FilterableList = ({className, data, selectable, onSelectedItemsChange}: IProps) => {
    const [filterText, setFilterText] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    const toggleSelect = (searchKey: number | undefined) => {
        if (searchKey === undefined) return;
        if (selectedItems.includes(searchKey)) {
            setSelectedItems(selectedItems.filter((item) => item !== searchKey));
        } else {
            setSelectedItems([...selectedItems, searchKey]);
        }
    };

    const filteredData = data.filter((item) => {
        // Filter the data based on the searchKeys and filterText
        return item.searchKeys.some((key) =>
            key?.toLowerCase().includes(filterText.toLowerCase())
        );
    });

    useEffect(()=> {
        // Send the updated selectedItems to the parent component
        if (onSelectedItemsChange) onSelectedItemsChange(selectedItems);
    }, [selectedItems]);

    return (
        <div className={className}>
            <Input
                type="text"
                placeholder="Filter"
                value={filterText}
                onChange={handleFilterChange}
            />
            <ul className="flex flex-col gap-2 p-2 overflow-auto h-64">
                {filteredData.map((item, index) => (
                    <li key={index} className={`flex h-12 items-center gap-2 p-2 rounded-lg relative ${selectedItems.includes(item.id) && "bg-blue-200"}`}>
                        {selectable && (
                            <>
                                <input
                                    className="accent-blue-500 h-4 w-4 rounded-full shadow"
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleSelect(item.id)}
                                    id={`item-${item.id}`}
                                />

                                <label htmlFor={`item-${item.id}`} className="absolute left-0 top-0 w-full h-full"></label>
                            </>
                        )}
                        {item.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterableList;