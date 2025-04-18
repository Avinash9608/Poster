import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const EnhancedCallToAction = ({
  title = "Ready to Create Your Own Poster?",
  subtitle = "Join our community and start creating eye-catching publicity posters today.",
  primaryButtonText = "𝚂𝚒𝚐𝚗 𝚄𝚙 𝙽𝚘𝚠",
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // white background
    scene.fog = new THREE.Fog(0xd7dddd, 9, 13);

    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    const hemiLight = new THREE.HemisphereLight(0xd7dddd, 0x101010, 1);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(5000, 5000);
    dirLight.penumbra = 0.8;
    scene.add(hemiLight, dirLight);

    class Book {
      constructor() {
        this.mesh = new THREE.Object3D();

        const geoCover = new THREE.BoxGeometry(2.4, 3, 0.05);
        const lmoCover = new THREE.BoxGeometry(0.05, 3, 0.59);
        const paperCover = new THREE.BoxGeometry(2.3, 2.8, 0.5);

        const posterColors = [
          0x475b47, 0x3a4e5a, 0x5a3a4e, 0x4e5a3a, 0x3a4e4a, 0x4a3a4e,
        ];
        const randomColor =
          posterColors[Math.floor(Math.random() * posterColors.length)];

        const coverMat = new THREE.MeshPhongMaterial({
          color: randomColor,
          specular: 0x111111,
          shininess: 30,
        });

        const paperMat = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          specular: 0x111111,
          shininess: 10,
        });

        const cover1 = new THREE.Mesh(geoCover, coverMat);
        const cover2 = new THREE.Mesh(geoCover, coverMat);
        const spine = new THREE.Mesh(lmoCover, coverMat);
        const pages = new THREE.Mesh(paperCover, paperMat);

        [cover1, cover2, spine, pages].forEach((mesh) => {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        });

        cover1.position.z = 0.3;
        cover2.position.z = -0.3;
        spine.position.x = 2.4 / 2;

        this.mesh.add(cover1, cover2, spine, pages);
      }
    }

    const bookGroup = new THREE.Group();
    const placedBooks = [];
    const a = 2;

    for (let i = 0; i < 15; i++) {
      const book = new Book();
      const s = 0.1 + Math.random() * 0.4;
      book.mesh.scale.set(s, s, s);

      let tries = 0;
      do {
        book.mesh.position.set(
          (Math.random() - 0.5) * a * 2,
          (Math.random() - 0.5) * a * 2,
          (Math.random() - 0.5) * a * 2
        );
        tries++;
      } while (isTooClose(book.mesh, placedBooks) && tries < 20);

      book.mesh.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
      );

      gsap.to(book.mesh.rotation, {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
        duration: 8 + Math.random() * 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.05 * i,
      });

      bookGroup.add(book.mesh);
      placedBooks.push(book.mesh);
    }

    bookGroup.position.x = 2;
    scene.add(bookGroup);

    const animate = () => {
      requestAnimationFrame(animate);
      bookGroup.rotation.x -= 0.001;
      bookGroup.rotation.y -= 0.002;
      bookGroup.rotation.z -= 0.0015;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  function isTooClose(newObj, others, minDistance = 1.5) {
    const newPos = newObj.position;
    for (let existing of others) {
      const dx = newPos.x - existing.position.x;
      const dy = newPos.y - existing.position.y;
      const dz = newPos.z - existing.position.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < minDistance) return true;
    }
    return false;
  }

  // Handle Sign Up button click to navigate to the login page
  const handleSignUpClick = () => {
    console.log("Navigating to login page");
    window.location.href = "/login"; // Use window.location for a full page navigation
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Three.js canvas container */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center z-10 ">
        <div className="w-full lg:w-1/2 px-8 lg:px-16 text-white mix-blend-difference">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight pointer-events-none title">
            {title}
          </span>
          <p className="text-white text-lg mt-4 mb-8 pointer-events-none">
            {subtitle}
          </p>
          <button
            className="custom-btn btn-11 mt-4 pointer-events-auto whitespace-nowrap"
            onClick={handleSignUpClick}
            style={{ width: "150px", height: "50px", fontSize: "16px" }}
          >
            <span className="flex items-center justify-center">
              Sign&nbsp;Up&nbsp;Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCallToAction;
