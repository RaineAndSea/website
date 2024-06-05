import { css } from '@emotion/css';
import { FC } from 'react';
import { Product, Variant } from '../../../util/cookies/cart-cookies';
import { MQ } from '../../../util/mediaQueries';
import { VariantSelect } from './variantSelect';

export const VariantsSection: FC<{
    product: Product;
    variants: Variant[];
    onChange: (variants: { [key: string]: string }) => void;
    variantValues: { [key: string]: string };
}> = ({ product, variants, onChange, variantValues }) => {
    const handleChange = (name: string, val: string) => {
        const updated = variantValues;
        updated[name] = val;

        onChange({ ...updated });
    };

    return (
        <section className={variantsSection}>
            {variants.length > 0 && (
                <section className='product-variants'>
                    {variants.map((variant, key) => (
                        <VariantSelect
                            key={key}
                            product={product}
                            variant={variant}
                            onChange={val => handleChange(variant.name, val)}
                        />
                    ))}
                </section>
            )}
            <section className='personalization'>
                <label htmlFor='personalization'>Personalization</label>
                <textarea />
                <p className='personalizationHint'>{product.personalizationHint || defaultPersonalizationHint}</p>
            </section>
        </section>
    );
};

const defaultPersonalizationHint = 'I will do my best to accommodate any special requests!';
const variantsSection = css`
    display: flex;
    gap: 1rem;
    width: 80%;
    flex-wrap: wrap;
    flex-direction: column;

    ${MQ.mobile} {
        width: 90%;
    }

    .product-variants {
        width: 100%;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        ${MQ.mobile} {
            gap: 0.3rem;
        }

        .variant-select {
            p {
                margin-left: 0.5rem;
            }

            select {
                height: 2.5rem;
            }
            min-width: 40%;
            flex-grow: 1;

            ${MQ.mobile} {
                select {
                    color: black;
                    background-color: white;
                }
            }
        }
    }

    select {
        width: 100%;
        padding: 0.5rem;
        border-radius: 10px;
        border: 1px solid #d8d8d8;

        ${MQ.mobile} {
            font-size: 0.8rem;
        }
    }

    textarea {
        padding: 0.5rem;
        border-radius: 10px;
        border: 1px solid #d8d8d8;
        max-width: 100%;
        min-height: 50px;
        max-height: 100px;
    }

    .personalization {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        resize: none;
        width: 100%;

        label {
            margin-left: 0.5rem;
        }

        .personalizationHint {
            margin: 0 0 0 0.5rem;
            font-size: .9rem;
            color: grey
        }
    }
`;
