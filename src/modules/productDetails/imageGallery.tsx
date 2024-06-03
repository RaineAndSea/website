import { css } from "@emotion/css";
import { FC } from "react";
import RImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Product } from "../../util/cookies/cart-cookies";

export const ImageGallery: FC<{product: Product}> = ({product}) => {
    const formattedImages = [{
        original: product.imgUrl,
        thumbnail: product.imgUrl
    },
    {
        original: product.imgUrl,
        thumbnail: product.imgUrl
    }]

    return(
        <div className={`${base} image-gallery`}>
            <RImageGallery items={formattedImages} />
        </div>
    )
}

const base = css`
    width: 55%;

    .image-gallery-image {
        border-radius: 15px;
    }

`