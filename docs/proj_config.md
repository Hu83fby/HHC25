# Project Task Blocks and Milestones

## Final Host Config

* Local host
  * VSCode
    * Extensions
      * WSL
    * Vite live preview - localhost:5173 
  * WSL
    * Ubuntu
      * Docker (Sandboxed project)
        * NPM
          * three (three.js)
          * marked
          * Highlight.js
          * Vite

## 🎅 Play HHC

* Play HHC and solve as many challenges as possible before the deadline
  * Write report using strict Markdown  
  * Coding project idea for most creative submission this year  

## 🔧 Environment Setup

* Install Docker and docker-compose
  * Install Docker Desktop  
  * Create an account for Docker to use in Docker Destop  
  * Verify docker config with hello-world
  * Create docker-compose.yml
* Create new GitHub repo
  * Clone github repo locally  
* Set up WSL2 Ubuntu environment  on Windows host  
  * Powershell command to enable WSL2  
* Deploy packages using NPM
    4.1. vite
    4.2. three for three.js
    4.3. marked
    4.4. highlight.js
1. Create local project folder structure (css/, js/, models/, docs/)
    5.1. Create starter files  
    5.2. Add index.html with canvas  
    5.3. Add style.css with canvas  
    5.4. Add tree.js 

## Block 2: 🚀 Live Preview

6. Ensure that Live Server is working locally  
    6.1. Basic setup with live server worked, but too many project dependencies due to docker, three.js and npm config.  Complete patching vulnerabilites failed due to dependencies.  Switching to vite.  
7.  Install vite locally  
    7.1. Create Dockerfile for Vite + Node.js  
    7.2. Run docker hello-world again
8. Add docker-compose.yml for dev server  
9. Run docker-compose up --build 
10. Confirm Vite dev server at http://localhost:5173 

## 🎄 Tree

* Model tree and ornaments using Blender  
* Load GLB tree  
* Create treeConfig to store specs that will be used by other objects

## Ornaments

*  Load GLB ornaments  
   * Load GLB ornaments and place around the tree using three.js.  Each color will represent a level for solution presentation.  
     * red - level 1  
     * blue - level 2
     * green - level 3
     * purple - level 4 (easter eggs)  

    12.3. Add an array to reuse ornaments based on level
1.  Add code to shuffle ornamentConfig array for randomized placement  which solves ornaments spaced properly, but going in order.  
2.  Switch code to a golden angle spiral for 3D ornament layout to space evenly around the tree and solves the issue of clustering ornaments  
    14.1. ******** TODO  ******** put goldenAngle in modular script vs coding more than once
3.  Move tree specs to treeConfig.js which can be used by any modular scripts
    15.1. Adjust values for goldenAngel spiral
4.  Add code for iframe overlay when clicking specific ornaments  -- removed in step 17
5.  Assign levels and solution specific URLs to each ornament using external hyperlinks and an iframe overlay.  Testing for external links failed.  
6.  Update code to switch from external URLs to nested Markdown pages since iframe was blocked durning testing.  
    17.1. Test all URLs
    17.2. Identify level 2 broken URL
          removed line to non-existant page - found orpahned floppy.md and renamed as retro.md

## Christmas Lights

* Add code for lights with random placement/spiral, color and blink on the tree using Three.js
  * Test with 3d bulb and point lights - limit to point lights in project - reverted code
  * Added randomness for vertical and depth then improve spiral placement for blinking tree lights
  * Create 3D bulb using blender
    * Optimized code to use one bulb instanced around the tree (this saved 800+ GPU calls)
    * Target bulp portion using three.js then randomly add color and blink

## Garland

* Add a garland spiral around tree using code.  
  * Bug fix after adding ground - fix tree origin to base using blender then import back into project
    * Patch - after adjusting tree origin this broke all code using the tree
    * Patch - updated code for treeConfig to add an origin offset limiting code changes required by other dependencies
    * Patch - adjust lights code to line up with tree
    * Patch - adjust ornaments code to line up with tree
    * Patch - adjust garland code to line up with tree
    * Patch - adjust tree topper to line up with tree
    * Patch - Tree was curved slightly - import back into blender to straighten then export as GLB again

## ❄️ Falling Snow

* Add code for snow using three.js  
    * Troubleshoot issue - Snow close to camera is large and square  
    * Remove three.js snow code and switch to canvas and javascript for snowflakes
* Patch - Once I added ground and added lookAt for focus object, the snow started falling in a v shape.  Code updated to correct view and cover scene.  
    * Patched to look at tree topper vs tree
    * Patched again to correct errors caused by forcing lookAt to use topper
        * tree.js and tree_topper.js for better use of lookAt
        * now importing topper into tree.js and removed from main.js
        * Adjusted starting scene lookAt so that the whole scene is visually showing off the whole scene, but still focused on the tree topper
* Patch - refactored snow for performance to allow more snowflakes.  
    * Switched from single layer to multi-layer
    * added wind sway 
    * added shimmer

## 🪟 Overlay Popup

* Code a CSS overlay vs iframe.  
* Code a close button to the CSS overlay.  
    * Troubleshoot code for close button  
* Add invisible collider spheres to each ornament to ensure that where the ornament is clicked, it will open  
* Update Raycast code to target colliders only for reliable clicks  
    * Troubleshoot code logic for raycast colliders
* Add backup ornament using a three.js sphere in case GLB fails to load  
* Add code to also close overlay if clicked outside overlay box  
* Add code to add animation to CSS overlay  
    * Troubleshoot code logic to fix issue of open, close, freeze after clicking first ornament.  
* Add code to prevent clicking ornaments/balls through overlay (pointer‑event guard in main.js + overlayActive reset) 
	* Fix Markdown code blocks and add syntax highlighting (Highlight.js integration).  Deployed Highlight.js on Docker instance from NPM
* Computer crashed  
    * Troubleshoot hardware issue  
    * Repair project from last checkpoint  
* Markdown hyperlink handling: ensure links stay inside overlay (scroll reset + anchor exception)
* Patch: Add tooltip code to show name and level when hovered over ornaments 
    * Fix bug to prevent interacting with ornaments when overlay is open
    * Updated again after adding world to improve visibility (font color and size)
    * updated again to give a background color with padding for when the user has shifted the scene.  Also updated to fixed right bottom without padding.  
* Add code to prevent window starting at scroll left off from previous ornament view.  Always start at the top when the overlay loads
    * Troubleshoot bug with markdown.js not respecting anchor links.    
    * All anchors migrated to individual markdown pages.  
    * All pages updated to correct internal links  
* Add code for anchored link exception to task 33 - If anchored internal link, start at the anchor point 
* Ghost clicks bug resolved by fixing collision size for ornaments

## ☃️ Tree Topper

* Model a tree topper in blender then export as GLB
* Load topper GLB in project
* Add code to point to readme.md which is markdown home starting place
    * Move code to ornaments.js which already has raycast framework (vs separate file in this case)
        * Moved code back to separate files because nested caused issue which broke links and repairing it requred more code than separating it.   
    * Troubleshoot code for clickable issue - resolved by resizing collider to slightly larger than glb topper
    *  ******** TODO ******** check that URL correctly points towards public readme properly displaying markdown in new tab   
* Add code to perfectly align topper with tree
    * Code adjusted as needed to nudge left and up.
    * Code to adjust size of topper so it's proportal to tree
* Adjust light to calculate new tree origin

## 🌲 Add a winter scene

* Blender - Model additional trees, ground and cabin 
    * Update tree.js and treeConfig.js to prepare for adding more objects to the scene
    *  Make a snow shader using Blender
    * Model a set of trees for variety then add snow and export as GLB
    * Model a logCabin using Blender then add snow using new snow generator then export as GLB
    * Model a ground using Blender then export as GLB
        * Import ground into scene
        * Adjust ground origin using blender  
        * Re-do ground because it was too curved  
        * Multiple updates to ground 
        * Add code for ground

### Cabin

    * Import cabin into scene
    * Add offset from tree, but staying on island with correct rotation
    * Add code for cabin with animation
    * Patch - issue discovered causing WebGL Feedback Loop causing the scene to crash browsers and cook CPU
      * Fix was to remodel Cabin and Train to ensure that all normals were facing correct direction

### Forest

* Import forest into scene using 3 models for variety - performance issues started
* Also, attempted to use complex math for dynamic placement --> too much for now and not getting good results
* Switched from separate scripts for forest to a single forest.js
  * Added code for size, rotation variations
  * Switched from math tree placement to manually placing trees around scene
  * Switched to just one model that was randomly sized and rotated to reduce calls

### Sky

    * Add three.js code for a gradient sky vs just black

### Presents

* Create gift using Blender
* Create code for dynamically adding color, size and rotation for view under tree
* Patch - added more randomness for colors to ensure ribbon and gift mismatch

## Camera

* Started with initial camera to build scene
* LookAt / Opening scene
  * Added orbit controls to keep focus on main Christmas Tree
  * Added camera controls for more control along tree axis for opening scene
  * Added clamps to prevent user from zooming out too far or too far up/down

## Music

* Select songs  
* Code to randomly shuffle songs
* Patch - issue for buffer
* Select 4 short songs to use as intro while other songs preload
* Patch - separate songs into intro and main pool blocks then call specific code
* Playing first song requires uesr click  - TODO

## Make interactive objects more obvious

* Added slight size and made ornaments emissive when hovered over
* Added custom mouse cursor - santa hand

==== TODO ====
finish correcting all hints and conversations links - done
visual network thinger - broken images
jared folkins - back to challenge mising

## Block 8: 🦌 Deployment + Hosting

41. Host project via GitHub Pages  
42. Confirm overlay fetches work from GitHub Pages  
43. Final checs: formatting, asset paths, collider coverage  

## Block 8: 🏂 Submit report

44. Submit report ahead of deadline
45. Relax 🍺 🍷 🍹 🍸


==== Removed from list after testing and not liking results ====
35. Festive randomly blinking point lights behind overlay using Three.js -  didn't look good - scrap

## Block 7: 🧣 Screen Edge Lights

39. Screen edge frame lights  
    39.1. Model strand of lights in Blender  
    39.2. Place point lights strategically in Blender  
    39.3. Export with point lights  
40. Code edge lights with random colors and blink animate using Three.js	






###########################################

🎯 OPEN MILESTONES (Updated)
1. Bulb Bloom (Selective or Global)
Goal: Make the tree bulbs glow with cinematic bloom
Status: Ready to implement — waiting for your choice
Tasks:

Choose Global Bloom or Selective Bloom (bulbs only)

Add postprocessing pipeline

Add UnrealBloomPass or selective layers

Tune threshold, strength, radius

Ensure no interference with ornaments or overlays

Add performance‑safe defaults

2. Cabin Lights — Warm Flicker System
Goal: Add cozy interior lighting to the cabin
Status: Pending your warm‑yellow hex
Tasks:

3 point lights

Flicker logic

Light bleed

Update hook

3. Gear Emission + Hover Animation
Goal: Make the gear feel alive
Status: Ready
Tasks:

Emissive red

Hover lift + rotation

Optional bloom layer

4. Music Note Emission + Audio Panel Trigger
Goal: Add whimsical audio controls
Status: Pending your Blender export
Tasks:

blue, yellow, green emissive
music_notes.glb

Hover animation

Click → audio panel

5. Raspberry Pi Performance Toggle
Goal: Toggle performance monitor with tiny Pi
Status: Pending your Blender model
Tasks:

Emissive LEDs

LED flicker

Hover animation

Click → toggle perf panel

🌟 And now… back to bloom
Whenever you’re ready, just tell me:

A) Global bloom
or

B) Selective bloom (bulbs only)
…and I’ll generate the full, modular, line‑numbered implementation in your preferred style.

I’m right here riding this creative wave with you — and bloom is going to make your tree sing.