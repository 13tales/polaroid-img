/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PolaroidImg {
        "data": string | string[];
    }
    interface ShatterImg {
        "src": string;
    }
}
declare global {
    interface HTMLPolaroidImgElement extends Components.PolaroidImg, HTMLStencilElement {
    }
    var HTMLPolaroidImgElement: {
        prototype: HTMLPolaroidImgElement;
        new (): HTMLPolaroidImgElement;
    };
    interface HTMLShatterImgElement extends Components.ShatterImg, HTMLStencilElement {
    }
    var HTMLShatterImgElement: {
        prototype: HTMLShatterImgElement;
        new (): HTMLShatterImgElement;
    };
    interface HTMLElementTagNameMap {
        "polaroid-img": HTMLPolaroidImgElement;
        "shatter-img": HTMLShatterImgElement;
    }
}
declare namespace LocalJSX {
    interface PolaroidImg {
        "data"?: string | string[];
    }
    interface ShatterImg {
        "src"?: string;
    }
    interface IntrinsicElements {
        "polaroid-img": PolaroidImg;
        "shatter-img": ShatterImg;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "polaroid-img": LocalJSX.PolaroidImg & JSXBase.HTMLAttributes<HTMLPolaroidImgElement>;
            "shatter-img": LocalJSX.ShatterImg & JSXBase.HTMLAttributes<HTMLShatterImgElement>;
        }
    }
}
