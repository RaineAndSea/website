import { css } from '@emotion/css';
import { FC, useRef, useState } from 'react';
import RImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Product } from '../../util/cookies/cart-cookies';
import { depth } from '../../util/depth';
import { MQ } from '../../util/mediaQueries';

interface Image {
    original: string;
    thumbnail: string;
}

const CustomControls: FC<{ currentIndex: number; onClick: (index: number) => void; imageCount: number }> = ({
    currentIndex,
    onClick,
    imageCount
}) => {
    return (
        <div className='image-gallery-dot'>
            {/* Assuming you want 3 dots */}
            {Array.from({ length: imageCount }).map((_, index) => (
                <div
                    key={index}
                    onClick={() => onClick(index)}
                    className={currentIndex === index ? 'button active' : 'button'}
                />
            ))}
        </div>
    );
};

export const ImageGallery: FC<{ product: Product }> = ({ product }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageGalleryRef = useRef<RImageGallery>(null);

    const formattedImages: Image[] = [
        {
            original: product.imgUrl,
            thumbnail: product.imgUrl
        },
        {
            original: product.imgUrl,
            thumbnail: product.imgUrl
        }
        // Add more images here
    ];

    const handleChangeIndex = (index: number) => {
        setCurrentIndex(index);
        imageGalleryRef.current?.slideToIndex(index);
    };

    const handleSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const isMobile = window.innerWidth < 800;
    return (
        <div className={`${base} image-gallery`}>
            <RImageGallery
                items={formattedImages}
                onSlide={index => handleSlide(index)}
                ref={imageGalleryRef}
                showNav={!isMobile}
                showThumbnails={!isMobile}
                thumbnailPosition={isMobile ? 'bottom' : 'left'} // Position thumbnails on the left
            />
            {/* Position custom controls at the bottom */}
            <div className='custom-controls-bottom'>
                <CustomControls
                    currentIndex={currentIndex}
                    onClick={handleChangeIndex}
                    imageCount={formattedImages.length}
                />
            </div>
        </div>
    );
};

const base = css`
    width: 55%;
    height: 65vh;
    border-radius: 15px;
    position: relative;

    ${MQ.mobile} {
        height: 40vh;
    }

    .image-gallery-slides {
        box-shadow: ${depth[2]};
        border-radius: 15px;
    }
    .image-gallery-slide img {
        width: 100%;
        height: 65vh;
        object-fit: cover;
        border-radius: 15px;

        ${MQ.mobile} {
            height: 40vh;
        }
    }
    .image-gallery-left-nav,
    .image-gallery-right-nav {
        transform: scale(0.8);
        top: 40%;
        transition: transform 0.3s;

        &:hover {
            .image-gallery-svg {
                transform: scale(0.85);
            }
        }
    }

    .image-gallery-left-nav svg,
    .image-gallery-right-nav svg {
        background-color: white;
        color: rgb(120, 120, 120);
        box-shadow: ${depth[2]};
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        transform: scale(0.8);
        padding: 0.5rem;
    }

    .image-gallery-thumbnails-wrapper {
        ${MQ.mobile} {
            display: none;
        }
    }

    .image-gallery-dot {
        display: flex;
        justify-content: center;
        gap: 0rem;
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .custom-controls-bottom {
        position: absolute;
        bottom: -2.2rem;
        left: 50%;
        transform: translateX(-50%);

        ${MQ.laptop} {
            display: none;
        }

        .button {
            width: 0.5rem;
            height: 0.5rem;
            margin: 0 0.5rem;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.3s;
            background-color: rgb(200, 200, 200);

            &.active {
                background-color: #000;
            }
        }
    }
`;
