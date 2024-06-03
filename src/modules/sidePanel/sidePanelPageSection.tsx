/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { BASE_QUERY } from '../../App';
import arrowIcon from '../../static/icons8-right-arrow-50.png';
import { formatURLItem } from './sidePanel-util';
import { MenuItem } from './sidePanelMenuItem';

type Categories = { [key: string]: string[] };
type MenuType = 'main' | 'product-categories' | string;
type Option = {
    label: string;
    icon?: string;
    subMenu?: MenuType;
};
type Menu = {
    options: Option[];
    parent?: MenuType;
    hrefPrefix?: string;
};

const mainOptions: Option[] = [
    { label: 'Home' },
    { label: 'Products', subMenu: 'product-categories' },
    { label: 'Contact' },
    { label: 'About me' }
];

const productCategoryOptions: Option[] = [{ label: 'All products' }];

interface PageSectionProps {
    navigate: (href: string) => void;
}

export const PageSection: FC<PageSectionProps> = ({ navigate }) => {
    const [currentMenu, setCurrentMenu] = useState<MenuType>('main');
    const [menuItemMap, setMenuItemMap] = useState<{ [key: string]: Menu }>({
        main: { options: mainOptions },
        'product-categories': { options: productCategoryOptions, parent: 'main' }
    });

    useEffect(() => {
        axios
            .get(`${BASE_QUERY}/products/categories`)
            .then(res => {
                const categories: Categories = res.data.categories;
                const updatedMenuMap = { ...menuItemMap };

                const newOptions = Object.entries(categories).map(([category, items]) => {
                    const subMenu: Menu | undefined = items.length
                        ? {
                              options: [{ label: `All ${category}` }, ...items.map(item => ({ label: item }))],
                              parent: 'product-categories',
                              hrefPrefix: 'products/'
                          }
                        : undefined;
                    return { option: { label: category, subMenu: subMenu ? category : undefined }, subMenu };
                });

                newOptions.forEach(({ option, subMenu }) => {
                    if (subMenu) {
                        updatedMenuMap[option.subMenu as string] = subMenu;
                    }
                    const existingOption = updatedMenuMap['product-categories'].options.find(
                        opt => opt.label === option.label
                    );
                    if (!existingOption) {
                        updatedMenuMap['product-categories'].options.push(option);
                    }
                });

                updatedMenuMap['product-categories'].options = updatedMenuMap['product-categories'].options.sort(
                    (a, b) => {
                        if (a.label === 'Misc') return 1;
                        if (b.label === 'Misc') return -1;
                        return a.label.localeCompare(b.label);
                    }
                );

                setMenuItemMap(updatedMenuMap);
            })
            .catch(err => console.error(err));
    }, []);

    const activeMenu = menuItemMap[currentMenu];

    return (
        <div>
            {currentMenu !== 'main' && <BackButton destination={activeMenu.parent} updateFn={setCurrentMenu} />}
            {activeMenu.options.map(({ label, icon, subMenu }, key) => (
                <MenuItem
                    key={key}
                    label={label}
                    icon={icon || undefined}
                    isStepThru={!!subMenu}
                    onClick={() => {
                        if (subMenu) {
                            setCurrentMenu(subMenu);
                        } else {
                            navigate(`${activeMenu.hrefPrefix || ''}${formatURLItem(label).replace('home', '')}`);
                        }
                    }}
                />
            ))}
        </div>
    );
};

const BackButton: FC<{ destination?: MenuType; updateFn: (menu: MenuType) => void }> = ({ destination, updateFn }) => {
    if (!destination) return null;

    return (
        <MenuItem label='Back' onClick={() => updateFn(destination)} icon={arrowIcon} iconPosition='left' mirrorIcon />
    );
};
