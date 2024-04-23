import Accessibility from '@/assets/svg/accesibility.svg';
import Attention from '@/assets/svg/attention.svg';
import Bell from '@/assets/svg/bell.svg';
import Calendar from '@/assets/svg/calendar.svg';
import Checkbox from '@/assets/svg/checkbox.svg';
import Checkmark from '@/assets/svg/checkmark.svg';
import CheckmarkRounded from '@/assets/svg/checkmark-rounded.svg';
import Chevron from '@/assets/svg/chevron.svg';
import ChevronBox from '@/assets/svg/chevron-box.svg';
import ChevronDown from '@/assets/svg/chevron-down.svg';
import Circle from '@/assets/svg/circle.svg';
import Closer from '@/assets/svg/closer.svg';
import CloserBig from '@/assets/svg/closer-big.svg';
import CloserMedium from '@/assets/svg/closer-medium.svg';
import CloserOutline from '@/assets/svg/closer-outline.svg';
import Cog from '@/assets/svg/cog.svg';
import Copy from '@/assets/svg/copy.svg';
import Crosshair from '@/assets/svg/crosshair.svg';
import Delete from '@/assets/svg/delete.svg';
import Download from '@/assets/svg/download.svg';
import DropdownArrow from '@/assets/svg/dropdown-arrow.svg';
import Edit from '@/assets/svg/edit.svg';
import Experimental from '@/assets/svg/experimental.svg';
import Eye from '@/assets/svg/eye.svg';
import Flag from '@/assets/svg/flag.svg';
import Folder from '@/assets/svg/folder.svg';
import Globe from '@/assets/svg/globe.svg';
import Hyperlink from '@/assets/svg/hyperlink.svg';
import Info from '@/assets/svg/info.svg';
import InfoBig from '@/assets/svg/info-big.svg';
import LabelPHME from '@/assets/svg/label-phme.svg';
import Layers from '@/assets/svg/layers.svg';
import LegendGradient from '@/assets/svg/legend-gradient.svg';
import LegendGradientCO2 from '@/assets/svg/legend-gradient-co2.svg';
import List from '@/assets/svg/list.svg';
import LocationPin from '@/assets/svg/location-pin.svg';
import Logo from '@/assets/svg/logo.svg';
import Loupe from '@/assets/svg/loupe.svg';
import LoupeBack from '@/assets/svg/loupe-back.svg';
import Measure from '@/assets/svg/measure.svg';
import Menu from '@/assets/svg/menu.svg';
import Minus from '@/assets/svg/minus.svg';
import More from '@/assets/svg/more.svg';
import Play from '@/assets/svg/play.svg';
import PlumeOrigin from '@/assets/svg/plume-origin.svg';
import Plus from '@/assets/svg/plus.svg';
import Polygon from '@/assets/svg/polygon.svg';
import QuestionMark from '@/assets/svg/question-mark.svg';
import Select from '@/assets/svg/select.svg';
import Shape from '@/assets/svg/shape.svg';
import Source from '@/assets/svg/source.svg';
import SourceCO2 from '@/assets/svg/source-co2.svg';
import Square from '@/assets/svg/square.svg';
import Stats from '@/assets/svg/stats.svg';
import Triangle from '@/assets/svg/triangle.svg';
import Upload from '@/assets/svg/upload.svg';
import User from '@/assets/svg/user.svg';

const iconMap = {
    accessibility: Accessibility,
    attention: Attention,
    bell: Bell,
    calendar: Calendar,
    checkbox: Checkbox,
    checkmark: Checkmark,
    'checkmark-rounded': CheckmarkRounded,
    chevron: Chevron,
    'chevron-box': ChevronBox,
    'chevron-down': ChevronDown,
    circle: Circle,
    closer: Closer,
    'closer-big': CloserBig,
    'closer-medium': CloserMedium,
    'closer-outline': CloserOutline,
    cog: Cog,
    copy: Copy,
    crosshair: Crosshair,
    delete: Delete,
    download: Download,
    'dropdown-arrow': DropdownArrow,
    edit: Edit,
    experimental: Experimental,
    eye: Eye,
    flag: Flag,
    folder: Folder,
    globe: Globe,
    hyperlink: Hyperlink,
    info: Info,
    'info-big': InfoBig,
    layers: Layers,
    'label-phme': LabelPHME,
    'legend-gradient': LegendGradient,
    'legend-gradient-co2': LegendGradientCO2,
    list: List,
    'location-pin': LocationPin,
    logo: Logo,
    loupe: Loupe,
    'loupe-back': LoupeBack,
    measure: Measure,
    menu: Menu,
    minus: Minus,
    more: More,
    play: Play,
    'plume-origin': PlumeOrigin,
    plus: Plus,
    polygon: Polygon,
    'question-mark': QuestionMark,
    select: Select,
    shape: Shape,
    source: Source,
    'source-co2': SourceCO2,
    square: Square,
    stats: Stats,
    triangle: Triangle,
    upload: Upload,
    user: User
};

export type IconName = keyof typeof iconMap;

const Icon = ({ icon: name }: { icon: IconName }) => {
    const CurrentIcon = iconMap[name] || <p>icon missing?</p>;

    return <CurrentIcon className={`svg-${name}`} />;
};

export default Icon;
