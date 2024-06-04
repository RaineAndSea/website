import { FC, useState } from 'react';
import { DropdownHeader, DropdownWrapper, OptionStyle, OptionsContainer } from '../../../static/styles/styles';

interface CustomDropdownProps {
    options: number[];
    defaultValue: number;
    onChange: (value: number) => void;
}

export const CustomDropdown: FC<CustomDropdownProps> = ({ options, defaultValue, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<number>(defaultValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (value: number) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    return (
        <DropdownWrapper>
            <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedValue}</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
            </DropdownHeader>
            {isOpen && (
                <OptionsContainer>
                    {options.map((option, index) => (
                        <OptionStyle key={index} onClick={() => handleSelect(option)}>
                            {option}
                        </OptionStyle>
                    ))}
                </OptionsContainer>
            )}
        </DropdownWrapper>
    );
};
