interface SlideBase {
    text?: string[];
}

export interface SlideWithVideo extends SlideBase {
    video: string;
}

export interface SlideWithImage extends SlideBase {
    image: string;
}

export type Slide = SlideWithVideo | SlideWithImage;

export type PageContent = {
    title: string;
    content: {
        type: 'text' | 'slider';
        text?: string[];
        slides?: Slide[];
    };
};

export type PageContentWithSlides = PageContent & {
    content: {
        type: 'slider';
        slides: Slide[];
    };
};

export type PageContentWithText = PageContent & {
    content: {
        type: 'text';
        text: string[];
    };
};
