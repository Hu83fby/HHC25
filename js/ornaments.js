import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { treeConfig } from './treeConfig';

export function loadOrnaments(scene, colliders) {
  const loader = new GLTFLoader();

  const ornamentConfig = [
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/train_station/orientation.md' },
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/City_Hall/Eds_Office2/defang.md' },
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/Data_Center/Neighborhood_Watch_Bypass.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/modern_scandinavian_condo/santa-tracking.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/Pond/Visual_Networking_Thinger.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/Grand_Hotel_Lobby/Netwars/visual_firewall.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/grand_hotel_parking_lot/nmap.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/Pond/spare_key.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/grand_hotel_parking_lot/open_door.md' }, 
    { file: './models/ball_red.glb', level: 1, url: 'docs/HHC_2025/neighborhood/Park/owner.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/Retro_Emporium/retro.md' },
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/City_Hall/mail_detective_curley.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/Sasabune/IDORable_Bistro.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/24-seven/Doasis_Network_Down.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/Park/Rogue_Gnome_Identity_Provider.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/Grand_Hotel_Lobby/Quantgnome_Leap.md' }, 
    { file: './models/ball_blue.glb', level: 2, url: 'docs/HHC_2025/neighborhood/Retro_Emporium/reverse.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/modern_scandinavian_condo/gnome-tea.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/Data_Center/hack-a-gnome.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/Grand_Hotel_Lobby/Netwars/snowcat.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/Retro_Emporium/Schrodingers_scope.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/Data_Center/frostys_snowglobe.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/City_Hall/on_the_wire.md' }, 
    { file: './models/ball_green.glb', level: 3, url: 'docs/HHC_2025/neighborhood/Retro_Emporium/Free_Ski.md' }, 
    { file: './models/ball_purple.glb', level: 4, url: 'docs/HHC_2025/neighborhood/Sasabune/jason.md' }, 
  ];

  const { radius, height, trunkOffset, goldenAngle, originOffset } = treeConfig;

const shuffle_URLs = [...ornamentConfig];
for (let i = shuffle_URLs.length -1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffle_URLs[i], shuffle_URLs[j]] = [shuffle_URLs[j], shuffle_URLs[i]]; 
}

  shuffle_URLs.forEach(({ file, level, url }, i) => {
    loader.load(file, (gltf) => {
      const ornament = gltf.scene.clone(true);
      ornament.scale.set(1, 1, 1);

      const angle = i * goldenAngle;
      const ornamentHeight = trunkOffset + (i / shuffle_URLs.length) * (height - trunkOffset);
      const ornamentRadius = radius * Math.pow(1 - ornamentHeight / height, 0.5);

      ornament.position.set(
        Math.cos(angle) * ornamentRadius,
        ornamentHeight - height / 2,
        Math.sin(angle) * ornamentRadius
      );

      ornament.position.x += originOffset.x;
      ornament.position.y += originOffset.y;
      ornament.position.z += originOffset.z;

      ornament.userData = { level, url, isOrnament: true }; 
      ornament.traverse(child => {
        if (child.isMesh) child.userData = { level, url, isOrnament: true  };
      });

      ornament.renderOrder = 1;
      scene.add(ornament);

      const ornamentCollider = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      ornamentCollider.position.copy(ornament.position);

      // Mark collider as an ornament hit target and store a reference
      ornamentCollider.userData = {
        level,
        url,
        isOrnament: true,
        ornamentRef: ornament,
      };

      scene.add(ornamentCollider);
      colliders.push(ornamentCollider);

    });
  });


}

// Ornament hover glow logic
let lastHoveredOrnament = null;

export function updateOrnamentHover(intersect) {
  if (intersect && intersect.object.userData.isOrnament) {
    const collider = intersect.object;
    const ornament = collider.userData.ornamentRef;

    if (!ornament) return;

    if (ornament !== lastHoveredOrnament) {
      // Reset previous ornament
      if (lastHoveredOrnament) {
        lastHoveredOrnament.traverse(child => {
          if (child.isMesh && child.material && 'emissive' in child.material) {
            child.material.emissiveIntensity = 0;
          }
        });
        lastHoveredOrnament.scale.set(1, 1, 1);
      }

      // Apply glow using each mesh's own color
      ornament.traverse(child => {
        if (child.isMesh && child.material && 'emissive' in child.material) {
          const baseColor = child.material.color.clone();
          child.material.emissive = baseColor;
          child.material.emissiveIntensity = 1.6;
        }
      });

      // Gentle scale-up on the whole ornament
      ornament.scale.set(1.25, 1.25, 1.25);

      lastHoveredOrnament = ornament;
    }
  } else {
    // Reset when not hovering an ornament
    if (lastHoveredOrnament) {
      lastHoveredOrnament.traverse(child => {
        if (child.isMesh && child.material && 'emissive' in child.material) {
          child.material.emissiveIntensity = 0;
        }
      });
      lastHoveredOrnament.scale.set(1, 1, 1);
      lastHoveredOrnament = null;
    }
  }
}


