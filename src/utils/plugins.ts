import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {

    gsap.registerPlugin(CustomEase, ScrollTrigger);

    CustomEase.create('custom', '.5, 0, .2, 1');
}
