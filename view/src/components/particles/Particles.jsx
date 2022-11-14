import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { loadFull } from 'tsparticles';
import { useCallback, useMemo } from 'react';
import { useSlotProps } from '@mui/base';
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";


const ParticlesComponent = (props) => {
    const options = {
        // fullScreen: true,
        // fpsLimit: 60,
        // detectRetina: true,
        // particles: {
        //     number: {
        //         value: 0
        //     },
        //     color: {
        //         value: ["#FF5A86", "#953AFE", "#FFC326", "#46C0FF"]
        //     },
        //     shape: {
        //         type: ["square", "circle"]
        //     },
        //     opacity: {
        //         value: 1,
        //         animation: {
        //             enable: true,
        //             minimumValue: 0,
        //             speed: 0.5,
        //             startValue: "max",
        //             destroy: "min"
        //         }
        //     },
        //     size: {
        //         value: 5 * 1
        //     },
        //     links: {
        //         enable: false
        //     },
        //     life: {
        //         duration: {
        //             value: 200 / 60
        //         },
        //         count: 1
        //     },
        //     move: {
        //         angle: {
        //             value: 45,
        //             offset: 0
        //         },
        //         drift: {
        //             min: -0,
        //             max: 0
        //         },
        //         enable: true,
        //         gravity: {
        //             enable: true,
        //             acceleration: 20
        //         },
        //         speed: 90,
        //         decay: 1 - 0.9,
        //         direction: -90,
        //         random: true,
        //         straight: false,
        //         outModes: {
        //             default: "none",
        //             bottom: "destroy"
        //         }
        //     },
        //     rotate: {
        //         value: {
        //             min: 0,
        //             max: 360
        //         },
        //         direction: "random",
        //         animation: {
        //             enable: true,
        //             speed: 60
        //         }
        //     },
        //     tilt: {
        //         direction: "random",
        //         enable: true,
        //         value: {
        //             min: 0,
        //             max: 360
        //         },
        //         animation: {
        //             enable: true,
        //             speed: 60
        //         }
        //     },
        //     roll: {
        //         darken: {
        //             enable: true,
        //             value: 25
        //         },
        //         enable: true,
        //         speed: {
        //             min: 15,
        //             max: 25
        //         }
        //     },
        //     wobble: {
        //         distance: 20,
        //         enable: true,
        //         speed: {
        //             min: -15,
        //             max: 15
        //         }
        //     }
        // },
        // emitters: {
        //     startCount: 0,
        //     position: { x: 50, y: 50 },
        //     size: {
        //         width: 0,
        //         height: 0
        //     },
        //     rate: {
        //         delay: 0,
        //         quantity: 10
        //     },
        //     life: {
        //         duration: 0,
        //         count: 1
        //     }
        // }

        //-----------------------------------------------------------------------------------------------------------

        // detectRetina: false,
        // interactivity: {
        //     detectsOn: "canvas",
        //     events: {
        //         onClick: {
        //             enable: false,
        //             mode: "push"
        //         },
        //         onDiv: {
        //             elementId: "repulse-div",
        //             enable: false,
        //             mode: "repulse"
        //         },
        //         onHover: {
        //             enable: true,
        //             mode: "bubble",
        //             parallax: {
        //                 enable: false,
        //                 force: 2,
        //                 smooth: 10
        //             }
        //         },
        //         resize: true
        //     },
        //     modes: {
        //         bubble: {
        //             distance: 40,
        //             duration: 2,
        //             opacity: 8,
        //             size: 6,
        //             speed: 3
        //         },
        //         connect: {
        //             distance: 80,
        //             lineLinked: {
        //                 opacity: 0.5
        //             },
        //             radius: 60
        //         },
        //         grab: {
        //             distance: 400,
        //             lineLinked: {
        //                 opacity: 1
        //             }
        //         },
        //         push: {
        //             quantity: 4
        //         },
        //         remove: {
        //             quantity: 2
        //         },
        //         repulse: {
        //             distance: 200,
        //             duration: 0.4
        //         },
        //         slow: {
        //             active: false,
        //             radius: 0,
        //             factor: 1
        //         }
        //     }
        // },
        // particles: {
        //     color: {
        //         value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"]
        //     },
        //     lineLinked: {
        //         blink: false,
        //         color: "random",
        //         consent: false,
        //         distance: 40,
        //         enable: true,
        //         opacity: 0.8,
        //         width: 1
        //     },
        //     move: {
        //         attract: {
        //             enable: false,
        //             rotate: {
        //                 x: 600,
        //                 y: 1200
        //             }
        //         },
        //         bounce: false,
        //         direction: "none",
        //         enable: true,
        //         outMode: "bounce",
        //         random: false,
        //         speed: 1,
        //         straight: false
        //     },
        //     number: {
        //         density: {
        //             enable: false,
        //             area: 2000
        //         },
        //         limit: 0,
        //         value: 200
        //     },
        //     opacity: {
        //         animation: {
        //             enable: true,
        //             minimumValue: 0.3,
        //             speed: 2,
        //             sync: false
        //         },
        //         random: false,
        //         value: 0.8
        //     },
        //     shape: {
        //         character: {
        //             fill: false,
        //             font: "Verdana",
        //             style: "",
        //             value: "*",
        //             weight: "400"
        //         },
        //         image: {
        //             height: 100,
        //             replaceColor: true,
        //             src: "https://particles.js.org/images/github.svg",
        //             width: 100
        //         },
        //         polygon: {
        //             sides: 5
        //         },
        //         stroke: {
        //             color: "#000000",
        //             width: 0
        //         },
        //         type: "circle"
        //     },
        //     size: {
        //         animation: {
        //             enable: false,
        //             minimumValue: 0.1,
        //             speed: 40,
        //             sync: false
        //         },
        //         random: true,
        //         value: 1
        //     }
        // },
        // polygon: {
        //     draw: {
        //         enable: false,
        //         lineColor: "rgba(255,255,255,0.2)",
        //         lineWidth: 0.5
        //     },
        //     enable: true,
        //     move: {
        //         radius: 5
        //     },
        //     position: {
        //         x: 30,
        //         y: 10
        //     },
        //     inlineArrangement: "equidistant",
        //     scale: 0.8,
        //     type: "inline",
        //     url: "https://particles.js.org/images/google.svg"
        // },
        // background: {
        //     color: "#000000",
        //     image: "",
        //     position: "50% 50%",
        //     repeat: "no-repeat",
        //     size: "cover"
        // }

        //-----------------------------------------------------------------------------------------------------------

        // background: {
        //     color: "#000",
        // },
        // fullScreen: {
        //     enable: true,
        //     zIndex: 0,
        // },
        // interactivity: {
        //     events: {
        //         onClick: {
        //             enable: true,
        //             mode: "push",
        //         },
        //         onHover: {
        //             enable: true,
        //             mode: "repulse",
        //         }
        //     },
        //     modes: {
        //         push: {
        //             quantity: 10,
        //         },
        //         repulse: {
        //             distance: 100,
        //         }
        //     }
        // },
        // particles: {
        //     links: {
        //         enable: true,
        //         distance: 100,
        //     },
        //     move: {
        //         enable: true,
        //         speed: { min: 1, max: 5 }
        //     },
        //     opacity: {
        //         value: { min: 0.3, max: 0.7 }
        //     },
        //     size: {
        //         value: { min: 1, max: 3 }
        //     },
        // }


        // preset: "seaAnemone"
    };

    const particlesInit = useCallback(async (engine) => {
        // await loadSeaAnemonePreset(engine);
        await loadFull(engine);
    }, []);


    return (
        // <Particles init={particlesInit} options={options} />
        // <div>
        <div id="tsparticles">
            <Particles init={particlesInit} options={options} />
        </div>
        // </div>
    )
};

export default ParticlesComponent;