/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface PolaroidImg {
        "data": string | string[];
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLPolaroidImgElement extends Components.PolaroidImg, HTMLStencilElement {
    }
    var HTMLPolaroidImgElement: {
        prototype: HTMLPolaroidImgElement;
        new (): HTMLPolaroidImgElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "polaroid-img": HTMLPolaroidImgElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface PolaroidImg {
        "data"?: string | string[];
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "polaroid-img": PolaroidImg;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "polaroid-img": LocalJSX.PolaroidImg & JSXBase.HTMLAttributes<HTMLPolaroidImgElement>;
        }
    }
}
