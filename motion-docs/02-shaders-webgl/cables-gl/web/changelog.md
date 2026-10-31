---
source: https://cables.gl/changelog
title: "Changelog"
fetched: 2026-10-28
---

# Changelog

---

 -

#### Ops

* New op:  [Ops.Array.Array3Scatter](https://cables.gl/op/Ops.Array.Array3Scatter) - Create copy of points at positions provided by another array
* New op: [Ops.Array.PointArray.TransformArray3NoTrigger](https://cables.gl/op/Ops.Array.PointArray.TransformArray3NoTrigger) - Transform (translate, rotate, scale) positions in an array3x
* New op:  [Ops.Devices.Serial.SerialPort](https://cables.gl/op/Ops.Devices.Serial.SerialPort) - Line based serial port communication
* New op:  [Ops.Extension.Rapier3d.SoftBody](https://cables.gl/op/Ops.Extension.Rapier3d.SoftBody) - New op
* New op:  [Ops.Gl.GLTF.GltfOverwriteTexture](https://cables.gl/op/Ops.Gl.GLTF.GltfOverwriteTexture) - Overwrite a texture coming from GLTF file
* New op:  [Ops.Gl.KtxTexture](https://cables.gl/op/Ops.Gl.KtxTexture) - Load a KTX Texture File
* New op:  [Ops.Html.CSS.ElementZIndex](https://cables.gl/op/Ops.Html.CSS.ElementZIndex) - Set CSS margins of a html element
* New op:  [Ops.Html.HtmlLinkPrefixedWords](https://cables.gl/op/Ops.Html.HtmlLinkPrefixedWords) - Create links from words with a prefix to a url as suffix
* New op:  [Ops.Performance.MeasureDrawCalls](https://cables.gl/op/Ops.Performance.MeasureDrawCalls) - Count number of drawcalls of all children of this op
* New op:  [Ops.Performance.MeasureTriggersPerSecond\_v2](https://cables.gl/op/Ops.Performance.MeasureTriggersPerSecond_v2) - Created as a new version of  [Ops.Trigger.TriggersPerSecond](https://cables.gl/op/Ops.Trigger.TriggersPerSecond)
* New op:  [Ops.Performance.Performance2](https://cables.gl/op/Ops.Performance.Performance2) - Show WebGl Performance Statistics
* Feature:  [Ops.Array.ArrayMergeMultiPort](https://cables.gl/op/Ops.Array.ArrayMergeMultiPort) - Added an array "group" output, containing the input index for each merged value
* Feature:  [Ops.Array.PointArray.PointsPlane\_v2](https://cables.gl/op/Ops.Array.PointArray.PointsPlane_v2) - Added multiply toggle, number of rows/columns will be multipied with width/height
* Feature:  [Ops.Cables.UploadAsset](https://cables.gl/op/Ops.Cables.UploadAsset) - Added option to upload assets to other patches
* Feature:  [Ops.Extension.Rapier3d.Joint](https://cables.gl/op/Ops.Extension.Rapier3d.Joint) - Add Motor config options to return to a default angle
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Support for GPU instancing extension, activate it in blender exporter
* Feature:  [Ops.Gl.RenderToTexture\_v3](https://cables.gl/op/Ops.Gl.RenderToTexture_v3) - Added DepthBuffer framebuffer input port, to reuse an existing depth buffer
* Feature:  [Ops.Gl.RenderToTextures\_v3](https://cables.gl/op/Ops.Gl.RenderToTextures_v3) - Added DepthBuffer framebuffer input port, to reuse an existing depth buffer
* Feature:  [Ops.Gl.Shader.CustomShader\_v2](https://cables.gl/op/Ops.Gl.Shader.CustomShader_v2) - Show parse errors in editor diagnostic panel
* Feature:  [Ops.Gl.Shader.CustomShader\_v2](https://cables.gl/op/Ops.Gl.Shader.CustomShader_v2) - Show shader parse/compile errors in editor diagnostic panel
* Feature:  [Ops.Html.ElementAsHtmlString](https://cables.gl/op/Ops.Html.ElementAsHtmlString) - Added switch to select between DOM element outerHTML or XML Serializer API
* Feature:  [Ops.Ui.VizImage](https://cables.gl/op/Ops.Ui.VizImage) - Just show the image without any border
* Feature:  [Ops.Ui.VizLogger](https://cables.gl/op/Ops.Ui.VizLogger) - Colors and time display
* Feature:  [Ops.Ui.VizString](https://cables.gl/op/Ops.Ui.VizString) - Show diagnostics errors as red lines
* Improvement:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Added better errorhandling, show ui error instead of console output for network and decoding errors
* Improvement:  [Ops.Boolean.And\_v2](https://cables.gl/op/Ops.Boolean.And_v2) - New Version v2: Multiport by default
* Improvement:  [Ops.Extension.Rapier3d.World\_v2](https://cables.gl/op/Ops.Extension.Rapier3d.World_v2) - Updated rapier to NPM 0.21, which is rapier probably 0.36
* Improvement:  [Ops.Extension.Voice.SpeechRecognition](https://cables.gl/op/Ops.Extension.Voice.SpeechRecognition) - Only start when active is true [github.com](https://github.com/cables-gl/cables/issues/8275)
* Improvement:  [Ops.Extension.Voice.SpeechRecognition](https://cables.gl/op/Ops.Extension.Voice.SpeechRecognition) - Show recognition errors in UI
* Improvement:  [Ops.Gl.ClearColor](https://cables.gl/op/Ops.Gl.ClearColor) - Added toggle to disable depth buffer clear
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Changing order of nodes improved and works without reloading the gltf
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Material alphamode "BLEND" will disable depth writing when rendering
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Use gltf texture v2 for using loaded textures in v5
* Improvement:  [Ops.Gl.GLTF.GltfTexture\_v2](https://cables.gl/op/Ops.Gl.GLTF.GltfTexture_v2) - Replace old gltf texture loader, is the gltf v5 way to use loaded textures
* Improvement:  [Ops.Gl.Matrix.ArrayPathFollowParticles\_v2](https://cables.gl/op/Ops.Gl.Matrix.ArrayPathFollowParticles_v2) - Do not try to render more than possible (max number of uniforms of point array), show error message when over limit
* Improvement:  [Ops.Gl.Meshes.ComposingGridOverlay](https://cables.gl/op/Ops.Gl.Meshes.ComposingGridOverlay) - Updated to current version of subpatchop code
* Improvement:  [Ops.Gl.Textures.ExrTexture](https://cables.gl/op/Ops.Gl.Textures.ExrTexture) - Better compatibility with .EXR files from blender [github.com](https://github.com/cables-gl/cables/issues/8593)
* Improvement:  [Ops.Gl.Textures.WebcamTexture\_v5](https://cables.gl/op/Ops.Gl.Textures.WebcamTexture_v5) - New version v5: when inactive or deleted op: "webcam recording indicator" will correctly turn off in OS/browser [github.com](https://github.com/cables-gl/cables/issues/8387)
* Improvement:  [Ops.Html.CSS.BackgroundImage\_v2](https://cables.gl/op/Ops.Html.CSS.BackgroundImage_v2) - Made it possible to change position without setting a background image (i.e. when added in css/elsewhere)
* Improvement:  [Ops.Html.Elements.ElementQuery](https://cables.gl/op/Ops.Html.Elements.ElementQuery) - Cache elements of last query to not update on every change
* Improvement:  [Ops.Performance.MeasureDuration](https://cables.gl/op/Ops.Performance.MeasureDuration) - Show time in extended op title
* Improvement:  [Ops.String.HandleBarsHtml\_v2](https://cables.gl/op/Ops.String.HandleBarsHtml_v2) - Inline parsing error diagnostics display
* Improvement:  [Ops.Trigger.RouteTriggerAnimated](https://cables.gl/op/Ops.Trigger.RouteTriggerAnimated) - Updated to current version of subpatchop code
* Improvement:  [Ops.Ui.VizString](https://cables.gl/op/Ops.Ui.VizString) - Automatically will enable linenumbers and syntax highlighting, when connected port uses "editorSyntax" uiAttrib
* Improvement:  [Ops.Ui.VizString](https://cables.gl/op/Ops.Ui.VizString) - Line numbers start at 1, no longer at 0, as this is the default in most editors
* Improvement:  [Ops.Vars.VarSetTexture\_v2](https://cables.gl/op/Ops.Vars.VarSetTexture_v2) - Removed a workaround by setting the texture to empty texture in between changes
* Bugfix:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Remove element on op deletion
* Bugfix:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Fix crash when number of bodies from array changed [github.com](https://github.com/cables-gl/cables/issues/8622)
* Bugfix:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Fixed transformation being wrong, when modelmatrix was scaled/rotated
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Correcly load colors in UINT8 format [github.com](https://github.com/cables-gl/cables/pull/8716)
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Fix webGL warning on console for Face culling
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Fixed bug with camera animation being off by one frame in some cases
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Metalness property uses default value of 1 when property is contained in gltf
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Show warning when GLTF sparse accessors are used
* Bugfix:  [Ops.Gl.GradientTexture\_v2](https://cables.gl/op/Ops.Gl.GradientTexture_v2) - Fixed a bug when setting dither values [github.com](https://github.com/cables-gl/cables/issues/8407)
* Bugfix:  [Ops.Gl.KtxTexture](https://cables.gl/op/Ops.Gl.KtxTexture) - Added visible error when KtxCompression op not in patch
* Bugfix:  [Ops.Gl.Shader.WireframeMaterial\_v2](https://cables.gl/op/Ops.Gl.Shader.WireframeMaterial_v2) - Changing alpha/opacity is no longer ignored when fill mode is off [github.com](https://github.com/cables-gl/cables/issues/8543)
* Bugfix:  [Ops.Gl.Shader.WireframeMaterial\_v2](https://cables.gl/op/Ops.Gl.Shader.WireframeMaterial_v2) - Fix crash when using with VertexNumberLimit [github.com](https://github.com/cables-gl/cables/issues/8467)
* Bugfix:  [Ops.Gl.Shader.WireframeMaterial\_v2](https://cables.gl/op/Ops.Gl.Shader.WireframeMaterial_v2) - Fix wireframe material not working with meshinstancer [github.com](https://github.com/cables-gl/cables/issues/8472)
* Bugfix:  [Ops.Gl.ShaderEffects.VertexWobble\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.VertexWobble_v2) - Fix: Invert checkbox was not updating the shader
* Bugfix:  [Ops.Gl.Textures.Histogram](https://cables.gl/op/Ops.Gl.Textures.Histogram) - Works again, bug related to point sprites rendering [github.com](https://github.com/cables-gl/cables/issues/8052)
* Bugfix:  [Ops.Html.CSS.ElementPosition](https://cables.gl/op/Ops.Html.CSS.ElementPosition) - Removed unused ports for z-index, use  [Ops.Html.CSS.ElementZIndex](https://cables.gl/op/Ops.Html.CSS.ElementZIndex)
* Bugfix:  [Ops.Html.CompareImages\_v2](https://cables.gl/op/Ops.Html.CompareImages_v2) - Output mismatch 100, when the resemble library returns undefined instead of a number
* Bugfix:  [Ops.Html.Elements.Element\_v2](https://cables.gl/op/Ops.Html.Elements.Element_v2) - Fixed an error when changing css class when element is not active
* Bugfix:  [Ops.Math.RandomCounter\_v4](https://cables.gl/op/Ops.Math.RandomCounter_v4) - New Version v4: Numbers are now random every time, and do not use the last seed of another op anymore [github.com](https://github.com/cables-gl/cables/issues/8574)
* Bugfix:  [Ops.Math.TriggerRandomNumber\_v4](https://cables.gl/op/Ops.Math.TriggerRandomNumber_v4) - New Version v4: Numbers are now random every time, and do not use the last seed of another op anymore [github.com](https://github.com/cables-gl/cables/issues/8574)
* Bugfix:  [Ops.Sidebar.SideBarImage](https://cables.gl/op/Ops.Sidebar.SideBarImage) - Fixed bug with image not added to sidebar in some cases [github.com](https://github.com/cables-gl/cables/issues/8423)
* Bugfix:  [Ops.Trigger.TriggerReceive](https://cables.gl/op/Ops.Trigger.TriggerReceive) - Added missing event to update dropdowns on namechange
* Bugfix:  [Ops.Ui.Area](https://cables.gl/op/Ops.Ui.Area) - Set correct position after undo, hide ports
* Bugfix:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Fixed object passtrough not being called on update
* Bugfix:  [Ops.WebAudio.FFTAreaAverage\_v4](https://cables.gl/op/Ops.WebAudio.FFTAreaAverage_v4) - New version v4: Output texture is no longer flipped (again)
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoBody](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoBody) - Op Extension.AmmoPhysics.AmmoBody was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoBodyCollision](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoBodyCollision) - Op Extension.AmmoPhysics.AmmoBodyCollision was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoCharacter](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoCharacter) - Op Extension.AmmoPhysics.AmmoCharacter was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoCharacterFpsCamera](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoCharacterFpsCamera) - Op Extension.AmmoPhysics.AmmoCharacterFpsCamera was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoDebugRenderer](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoDebugRenderer) - Op Extension.AmmoPhysics.AmmoDebugRenderer was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoEmitter](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoEmitter) - Op Extension.AmmoPhysics.AmmoEmitter was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoRaycast](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoRaycast) - Op Extension.AmmoPhysics.AmmoRaycast was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.AmmoWorld](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.AmmoWorld) - Op Extension.AmmoPhysics.AmmoWorld was deprecated
* Deprecation:  [Ops.Extension.AmmoPhysics.Deprecated.GltfAmmoBodies](https://cables.gl/op/Ops.Extension.AmmoPhysics.Deprecated.GltfAmmoBodies) - Op Extension.AmmoPhysics.GltfAmmoBodies was deprecated
* Rename:  [Ops.Performance.MeasureTriggersPerSecond](https://cables.gl/op/Ops.Performance.MeasureTriggersPerSecond) - Trigger.TriggersPerSecond renamed to  [Ops.Performance.MeasureTriggersPerSecond](https://cables.gl/op/Ops.Performance.MeasureTriggersPerSecond)
* Rename:  [Ops.Ui.VizImage](https://cables.gl/op/Ops.Ui.VizImage) - Ui.VizImageUrl renamed to  [Ops.Ui.VizImage](https://cables.gl/op/Ops.Ui.VizImage)
* Rename:  [Ops.WebAudio.AudioInput\_v2](https://cables.gl/op/Ops.WebAudio.AudioInput_v2) - WebAudio.MicrophoneIn\_v2 renamed to  [Ops.WebAudio.AudioInput\_v2](https://cables.gl/op/Ops.WebAudio.AudioInput_v2)
* Rename:  [Ops.WebAudio.AudioOutput\_v2](https://cables.gl/op/Ops.WebAudio.AudioOutput_v2) - WebAudio.Output\_v2 renamed to  [Ops.WebAudio.AudioOutput\_v2](https://cables.gl/op/Ops.WebAudio.AudioOutput_v2)

#### Website

* Bugfix: Time and date are now always shown in the users timezone
* Bugfix: Fixed display of public patches on patch page when not logged in
* Feature: Added option for team-owner to remove patches from team
* Feature: Added social media share buttons to patch page (mastodon/bluesky)
* Feature: Added bluesky to social accounts to add in user settings
* Improvement: Now listing credits of core-ops on support page
* Improvement: Moved team-namespace and extension settings to tabs
* Improvement: Updated exe-export electron version to 43.2.0
* Improvement: Added info of subpatches user has no permission to to "my ops" tab on op page
* Improvement: Made email confirmation link directly log in user
* Improvement: Seperated team namespace settings into tabs
* Improvement: Updated WASM usage documentation
* Improvement: Made deprecated op-library error only visible to users with write permissions on op page

#### Editor

* Bugfix: Fix and improve dragging of ports to and from the parameter panel title lines into/from the patchfield [github.com](https://github.com/cables-gl/cables/issues/8429)
* Bugfix: Fix cursors of elements/conflicting with cgl cursor handling [github.com](https://github.com/cables-gl/cables/issues/8485)
* Bugfix: Always show shortnames of ops and only newest version in opselect
* Bugfix: Math expression parsing in number input ports works again [github.com](https://github.com/cables-gl/cables/issues/8158)
* Bugfix: Fix bug when code editor showed up blank, when the file was already opened
* Bugfix: Timeline value drag not registering mouse up eveng and keeps dragging in some situations
* Bugfix: Fix problem with patchfield scrolls to wrong position after creating a new op
* Bugfix: Upgrading ops not loosing animation data anymore
* Bugfix: Fixed bug where commands in palette where not bookmarkable anymore
* Feature: CMD/CTRL + D will duplicate ops, it will also duplicate all cables connected to ops outside of this connection [github.com](https://github.com/cables-gl/cables/issues/8104)
* Feature: Text editor remembers the line your cursor was in when reloading the editor
* Feature: Added edit button and dialog for op summary to manage op tab
* Feature: Added button and modal dialog to add credits in manage op
* Feature: Scroll vizOp content, e.g. vizstring by using mousewheel while pressing cmd key
* Feature: Added a new diagnostics panel below text editor, to show errors about the current source code/port input depending on type etc
* Improvement: Added commands to set timeline time/frame
* Improvement: Show a minimalistic upload progressbar when uploading files to the editor, will be cumulated when uploading multiple files at once [github.com](https://github.com/cables-gl/cables/issues/8185)
* Improvement: Timeline icon state of play/pause is now correctly updated when using other ways to toggle it
* Improvement: Restore the view position/zoom and subpatch op when loading the patch after saving
* Improvement: Improved [c] centering/zooming takes sidepanels into account
* Improvement: Removed link to old ops in rename op dialog
* Improvement: Resize corners on patchfield will show resize cursor on hovering
* Improvement: CMD Z/CTRL Z does not change zoom anymore [github.com](https://github.com/cables-gl/cables/issues/8568)
* Improvement: Cleanup of all source code: typescript definitions and jsdoc rework
* Improvement: Better performance on viztexture ops, textures previews cached internally, can be updated less often than canvas now
* Improvement: Drag cables with CMD key down to clone cable (was only possible with alt key)
* Improvement: Op search calculates a namespace similarity score and will rank overlapping namespaces higher
* Improvement: More op focus animations when op was upgraded/downgraded/replaced
* Improvement: Red alert triangle is removed, error ops are shown in patch outline
* Improvement: Reworked table for op dependencies and attachments in manage op tab
* Improvement: Much better support of scrolling and pinch/zoom with touchpad (macbook)
* Improvement: Unified and improved handling of attachments and other dependencies in manage op tab
* Improvement: Most modal dialogs can now be submited by pressing enter
* Improvement: Unified handling of attachments and libraries in mangage op

#### Standalone

* Bugfix: Fixed loading/adding of extension ops in opselect
* Bugfix: Fixed bug with opening the local directory of any op from "manage op"
* Bugfix: Made local op-dir not removable, fix bug when removing other op-dirs
* Bugfix: Fixed bug when adding assets via drag and drop introduced by new electron version
* Bugfix: Fix a bug where ops would not appear in patch when deleted on disk
* Improvement: Add cmd/ctrl-0 shortcut to reset zoom
* Improvement: Updated electron version to 43.2.0

[![screenshot Ops.Array.Array3Scatter](https://cables.gl/op/screenshot/Ops.Array.Array3Scatter.png)](https://cables.gl/op/Ops.Array.Array3Scatter)![op Ops.Array.Array3Scatter](https://cables.gl/api/op/layout/Ops.Array.Array3Scatter.svg)

[![screenshot Ops.Devices.Serial.SerialPort](https://cables.gl/op/screenshot/Ops.Devices.Serial.SerialPort.png)](https://cables.gl/op/Ops.Devices.Serial.SerialPort)![op Ops.Devices.Serial.SerialPort](https://cables.gl/api/op/layout/Ops.Devices.Serial.SerialPort.svg)

[![screenshot Ops.Extension.Rapier3d.SoftBody](https://cables.gl/op/screenshot/Ops.Extension.Rapier3d.SoftBody.png)](https://cables.gl/op/Ops.Extension.Rapier3d.SoftBody)![op Ops.Extension.Rapier3d.SoftBody](https://cables.gl/api/op/layout/Ops.Extension.Rapier3d.SoftBody.svg)

[![screenshot Ops.Gl.GLTF.GltfOverwriteTexture](https://cables.gl/op/screenshot/Ops.Gl.GLTF.GltfOverwriteTexture.png)](https://cables.gl/op/Ops.Gl.GLTF.GltfOverwriteTexture)![op Ops.Gl.GLTF.GltfOverwriteTexture](https://cables.gl/api/op/layout/Ops.Gl.GLTF.GltfOverwriteTexture.svg)

[![screenshot Ops.Gl.KtxTexture](https://cables.gl/op/screenshot/Ops.Gl.KtxTexture.png)](https://cables.gl/op/Ops.Gl.KtxTexture)![op Ops.Gl.KtxTexture](https://cables.gl/api/op/layout/Ops.Gl.KtxTexture.svg)

[![screenshot Ops.Html.CSS.ElementZIndex](https://cables.gl/op/screenshot/Ops.Html.CSS.ElementZIndex.png)](https://cables.gl/op/Ops.Html.CSS.ElementZIndex)![op Ops.Html.CSS.ElementZIndex](https://cables.gl/api/op/layout/Ops.Html.CSS.ElementZIndex.svg)

[![screenshot Ops.Html.HtmlLinkPrefixedWords](https://cables.gl/op/screenshot/Ops.Html.HtmlLinkPrefixedWords.png)](https://cables.gl/op/Ops.Html.HtmlLinkPrefixedWords)![op Ops.Html.HtmlLinkPrefixedWords](https://cables.gl/api/op/layout/Ops.Html.HtmlLinkPrefixedWords.svg)

[![screenshot Ops.Performance.MeasureDrawCalls](https://cables.gl/op/screenshot/Ops.Performance.MeasureDrawCalls.png)](https://cables.gl/op/Ops.Performance.MeasureDrawCalls)![op Ops.Performance.MeasureDrawCalls](https://cables.gl/api/op/layout/Ops.Performance.MeasureDrawCalls.svg)

[![screenshot Ops.Performance.MeasureTriggersPerSecond_v2](https://cables.gl/op/screenshot/Ops.Performance.MeasureTriggersPerSecond_v2.png)](https://cables.gl/op/Ops.Performance.MeasureTriggersPerSecond_v2)![op Ops.Performance.MeasureTriggersPerSecond_v2](https://cables.gl/api/op/layout/Ops.Performance.MeasureTriggersPerSecond_v2.svg)

[![screenshot Ops.Performance.Performance2](https://cables.gl/op/screenshot/Ops.Performance.Performance2.png)](https://cables.gl/op/Ops.Performance.Performance2)![op Ops.Performance.Performance2](https://cables.gl/api/op/layout/Ops.Performance.Performance2.svg)

---

 -

#### Ops

* Bugfix:  [Ops.Data.Compose.String.CompString](https://cables.gl/op/Ops.Data.Compose.String.CompString) - Fix problem with buffer not being cleared when starting to compose [github.com](https://github.com/cables-gl/cables/issues/8193#issuecomment-4161263196)
* Bugfix:  [Ops.Data.JsonPath.ObjectGetStringByPath\_v2](https://cables.gl/op/Ops.Data.JsonPath.ObjectGetStringByPath_v2) - Fix "found" output port
* Bugfix:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Fix problems with forcing comple body resetup too often
* Bugfix: [Ops.Extension.Rapier3d.CheckCollisionPairsEvents](https://cables.gl/op/Ops.Extension.Rapier3d.CheckCollisionPairsEvents) - Fix eventsystem
* Bugfix:  [Ops.Extension.SocketCluster.SocketClusterReceiveObject](https://cables.gl/op/Ops.Extension.SocketCluster.SocketClusterReceiveObject) - Unsubscribe from channel on socket change
* Bugfix:  [Ops.Extension.SocketCluster.SocketClusterReceiveTrigger](https://cables.gl/op/Ops.Extension.SocketCluster.SocketClusterReceiveTrigger) - Unsubscribe from channel on socket change
* Bugfix:  [Ops.Gl.CubeMap.Skybox](https://cables.gl/op/Ops.Gl.CubeMap.Skybox) - Fix problems not rendering anything when used below renderToTextures op
* Bugfix:  [Ops.Gl.GLTF.GltfDracoCompression\_v2](https://cables.gl/op/Ops.Gl.GLTF.GltfDracoCompression_v2) - Draco GLTF files now include all texture coordinate/UV channels, not only the first anymore
* Bugfix:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Mesh morph targets now work with more vertices than the max texture size
* Bugfix:  [Ops.Gl.Shader.PointMaterial\_v6](https://cables.gl/op/Ops.Gl.Shader.PointMaterial_v6) - Fix bug with texturemapping
* Bugfix:  [Ops.Gl.Textures.VideoTexture\_v3](https://cables.gl/op/Ops.Gl.Textures.VideoTexture_v3) - Fix bug where texture was updated too often
* Bugfix:  [Ops.Graphics.Geometry.TransformGeometry\_v2](https://cables.gl/op/Ops.Graphics.Geometry.TransformGeometry_v2) - Fix rotation order, so it works as normal transform op
* Bugfix:  [Ops.Graphics.Meshes.Circle\_v4](https://cables.gl/op/Ops.Graphics.Meshes.Circle_v4) - Fixed texture coordinates when give an inner radius and chose "round" mapping
* Bugfix:  [Ops.Html.CSS.ElementSize](https://cables.gl/op/Ops.Html.CSS.ElementSize) - Update op when changing height/width units
* Bugfix:  [Ops.Html.ElementGradientBg](https://cables.gl/op/Ops.Html.ElementGradientBg) - Fix passthrough of element via outport
* Bugfix:  [Ops.Html.GridLayout.Grid](https://cables.gl/op/Ops.Html.GridLayout.Grid) - Output new element when updating styles
* Bugfix:  [Ops.Json.ObjectSetNumber\_v2](https://cables.gl/op/Ops.Json.ObjectSetNumber_v2) - Handle non numeric input values
* Bugfix: [Ops.TimeLine.TimeLineFrame\_v2](https://cables.gl/op/Ops.TimeLine.TimeLineFrame_v2) - New Version v2: Using timeline config FPS for frame calculation from timeline time
* Bugfix:  [Ops.Ui.VizBool](https://cables.gl/op/Ops.Ui.VizBool) - Fix bug when op is resized to very small
* Feature:  [Ops.Array.ArrayToString\_v3](https://cables.gl/op/Ops.Array.ArrayToString_v3) - Added prefix parameter, e.g. to make lists starting with "-"
* Feature:  [Ops.Array.PointArray.RedistributeSplinePoints\_v2](https://cables.gl/op/Ops.Array.PointArray.RedistributeSplinePoints_v2) - New version v2: Automatically update when array changes
* Feature:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Added active toggle, will unload audio when not checked
* Feature:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Added output for duration of audio file
* Feature: [Ops.Cables.Ops.OpsLoadingStatus](https://cables.gl/op/Ops.Cables.Ops.OpsLoadingStatus) - Get ops in current patch that have a specific tag
* Feature:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Added wakeup button
* Feature:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Allow collision detection of fixes vs fixed bodies
* Feature:  [Ops.Extension.Rapier3d.RayCast](https://cables.gl/op/Ops.Extension.Rapier3d.RayCast) - Option to exclude sensors when casting ray
* Feature:  [Ops.Extension.Standalone.Files.WriteTextFile](https://cables.gl/op/Ops.Extension.Standalone.Files.WriteTextFile) - Auto write file when string changes
* Feature:  [Ops.Gl.GLTF.GltfNodeTransform\_v2](https://cables.gl/op/Ops.Gl.GLTF.GltfNodeTransform_v2) - Added switch to select between world space and model space
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - "Double sided" material setting is now used to cull backfaces or not, when using material properties
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Added input field to filter nodes,materials,geometries by name
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Basic automatic loading and usage of embedded textures
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Manual reordering of rendering order, set order to negative value in structure view to render nodes earlier, e.g. optimize for transparency ordering
* Feature:  [Ops.Gl.Geometry.GeometryBoundingBox](https://cables.gl/op/Ops.Gl.Geometry.GeometryBoundingBox) - Added output for axis sizes
* Feature:  [Ops.Gl.GradientTexture\_v2](https://cables.gl/op/Ops.Gl.GradientTexture_v2) - New version v2: Added more interpolation methods
* Feature:  [Ops.Gl.ImageCompose.ColorChannel\_v3](https://cables.gl/op/Ops.Gl.ImageCompose.ColorChannel_v3) - New version v3: added option to easily switch colorchannels and/or set specific channels to zero or one
* Feature:  [Ops.Gl.ImageCompose.Math.RgbTransform\_v2](https://cables.gl/op/Ops.Gl.ImageCompose.Math.RgbTransform_v2) - Fix rotation order, so it works as normal transform op
* Feature:  [Ops.Gl.ImageCompose.PixelDisplacement\_v4](https://cables.gl/op/Ops.Gl.ImageCompose.PixelDisplacement_v4) - Added toggle for antialiasing
* Feature:  [Ops.Gl.Pbr.PbrMaterial](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial) - Add option to flip all textures
* Feature:  [Ops.Gl.Pbr.PbrMaterial](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial) - Added option to multiply albedo texture with diffuse color
* Feature:  [Ops.Gl.Pbr.PbrMaterial\_v2](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial_v2) - Add option to flip all textures
* Feature:  [Ops.Gl.Pbr.PbrMaterial\_v2](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial_v2) - Added extra input for AO/Occlusion texture, connect an AORM texture to both inputs
* Feature:  [Ops.Gl.Pbr.PbrMaterial\_v2](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial_v2) - Added option to multiply albedo texture with diffuse color
* Feature:  [Ops.Gl.RenderToTexture\_v3](https://cables.gl/op/Ops.Gl.RenderToTexture_v3) - Added output for framebuffer
* Feature:  [Ops.Gl.Shader.BasicMaterial\_v3](https://cables.gl/op/Ops.Gl.Shader.BasicMaterial_v3) - Rendering of textures from gltf files
* Feature:  [Ops.Gl.ShaderEffects.TransformArea\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea_v2) - Added falloff and falloff curve parameters to smoothly mix in the changes to the area bounds, so there is not a hard cut
* Feature:  [Ops.Gl.ShaderEffects.TransformArea\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea_v2) - Added rotation
* Feature:  [Ops.Gl.ShaderEffects.TransformArea\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea_v2) - New version v2: Added amount toggle, a multipier to the transformation, handy for fading in/out
* Feature:  [Ops.Gl.ShaderEffects.TransformArea\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea_v2) - Visualize area does no longer stop the modification, you can now use amount to do that
* Feature:  [Ops.Gl.TextureToPointArray3](https://cables.gl/op/Ops.Gl.TextureToPointArray3) - Added output for a color array of the filtered pixels
* Feature:  [Ops.Graphics.Geometry.ScaleGeometry](https://cables.gl/op/Ops.Graphics.Geometry.ScaleGeometry) - Add scaling multiplier per axis
* Feature:  [Ops.Graphics.Geometry.ScaleGeometry](https://cables.gl/op/Ops.Graphics.Geometry.ScaleGeometry) - Added option for scaling to a target size for each axis
* Feature:  [Ops.Html.CSS.CssFile](https://cables.gl/op/Ops.Html.CSS.CssFile) - Reload button added
* Feature:  [Ops.Html.CSS.ElementCssText](https://cables.gl/op/Ops.Html.CSS.ElementCssText) - Added text-decoration parameter
* Feature:  [Ops.Math.RandomNumbers\_v4](https://cables.gl/op/Ops.Math.RandomNumbers_v4) - New version v4: multiport, add new random number outputs
* Feature:  [Ops.String.Uppercase\_v2](https://cables.gl/op/Ops.String.Uppercase_v2) - Added toggle for capitalize, only set the first character uppercase
* Feature:  [Ops.TimeLine.TimeLinePlay](https://cables.gl/op/Ops.TimeLine.TimeLinePlay) - Added trigger to toggle between play/pause
* Feature:  [Ops.Ui.CablesEditorEvents](https://cables.gl/op/Ops.Ui.CablesEditorEvents) - Added events to trigger, when op created/deleted, port linked etc
* Feature:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Added functionality to string search the whole object
* Feature:  [Ops.Ui.VizTexture](https://cables.gl/op/Ops.Ui.VizTexture) - Add option to show a specific mip level
* Feature:  [Ops.Ui.VizTexture](https://cables.gl/op/Ops.Ui.VizTexture) - Option to debug by only visualizing one RGB channel
* Feature:  [Ops.Ui.VizTexture](https://cables.gl/op/Ops.Ui.VizTexture) - Option to visualize RGBE encoded images
* Feature:  [Ops.Vars.VarGetNumber\_v2](https://cables.gl/op/Ops.Vars.VarGetNumber_v2) - Add button to directly assign the used variable to the connected port
* Feature:  [Ops.Website.LocalStorageKeys](https://cables.gl/op/Ops.Website.LocalStorageKeys) - Add support for sessionStorage
* Feature:  [Ops.Website.LocalStorageNumber](https://cables.gl/op/Ops.Website.LocalStorageNumber) - Add support for sessionStorage
* Feature:  [Ops.Website.LocalStorageString](https://cables.gl/op/Ops.Website.LocalStorageString) - Add support for sessionStorage
* Improvement:  [Ops.Array.ArrayGetObject](https://cables.gl/op/Ops.Array.ArrayGetObject) - Add "found" outport boolean
* Improvement:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Add current time output port
* Improvement:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Add time input port for scrubbing
* Improvement:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Added toggle for creating a loading task when loading a file
* Improvement:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Clamp volume between 0-1
* Improvement:  [Ops.Boolean.And\_v2](https://cables.gl/op/Ops.Boolean.And_v2) - New Version v2: Multiport by default
* Improvement:  [Ops.Cables.UIMode](https://cables.gl/op/Ops.Cables.UIMode) - Add current value of canvas mode as default value
* Improvement:  [Ops.Devices.Mouse.MouseButtons](https://cables.gl/op/Ops.Devices.Mouse.MouseButtons) - Only trigger mouseUp outputs when down was pressed while active was true
* Improvement:  [Ops.Extension.Lottie.LottieSVGPlayer\_v2](https://cables.gl/op/Ops.Extension.Lottie.LottieSVGPlayer_v2) - New Version v2: upgraded lottie.js to version 5.13.0
* Improvement:  [Ops.Extension.OpenType.OpentypeToSvgPath](https://cables.gl/op/Ops.Extension.OpenType.OpentypeToSvgPath) - Added support for line breaks, added line height parameter
* Improvement: [Ops.Extension.Rapier3d.Body\_v2](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v2) - Use current modelmatrix information like translation and scale
* Improvement:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Better use of current modelMatrix rotation
* Improvement:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Overlay mode will show body translation dot and information
* Improvement:  [Ops.Extension.Rapier3d.Body\_v3](https://cables.gl/op/Ops.Extension.Rapier3d.Body_v3) - Use current modelmatrix information like translation and scale
* Improvement:  [Ops.Extension.Standalone.Files.PathToFileUrl](https://cables.gl/op/Ops.Extension.Standalone.Files.PathToFileUrl) - Treat relative paths as relative to patch dir
* Improvement:  [Ops.Extension.Standalone.Files.SelectFile](https://cables.gl/op/Ops.Extension.Standalone.Files.SelectFile) - Treat relative paths as relative to patch dir
* Improvement:  [Ops.Extension.Standalone.Files.SystemDirs](https://cables.gl/op/Ops.Extension.Standalone.Files.SystemDirs) - Add patchdir output port
* Improvement:  [Ops.Extension.Standalone.Files.WriteTextFile](https://cables.gl/op/Ops.Extension.Standalone.Files.WriteTextFile) - Resolve relative paths to patch directory, add output port
* Improvement:  [Ops.Extension.Standalone.Net.ReadTextFile](https://cables.gl/op/Ops.Extension.Standalone.Net.ReadTextFile) - Resolve relative paths to patch directory, add output port
* Improvement:  [Ops.Gl.ExternalCanvas](https://cables.gl/op/Ops.Gl.ExternalCanvas) - Add option to open with transparent background
* Improvement:  [Ops.Gl.GLTF.GltfDracoCompression\_v2](https://cables.gl/op/Ops.Gl.GLTF.GltfDracoCompression_v2) - Upgraded library to draco v1.5.7 [github.com](https://github.com/google/draco)
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Extension KHR\_texture\_transform added for texture transforms, scaling and offset
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Memory usage/Garbage collection optimized
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - More information about embedded textures and texture loading/binding bugs fixed / loading of occlusion textures
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - New Version 5: "Use Material Properties" is enables by default
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Tangents and bitangents are now calculated using the mikktspace algorithm, leading to correct looking normal maps and lighting
* Improvement:  [Ops.Gl.Geometry.BoundingBoxVisible](https://cables.gl/op/Ops.Gl.Geometry.BoundingBoxVisible) - Show an error if the object is not a bounding box
* Improvement:  [Ops.Gl.Matrix.ArrayPathFollowParticles\_v2](https://cables.gl/op/Ops.Gl.Matrix.ArrayPathFollowParticles_v2) - Add random texture coordinate per particle
* Improvement:  [Ops.Gl.Pbr.PbrMaterial](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial) - Better loading of settings from gltf files / textures
* Improvement:  [Ops.Gl.Pbr.PbrMaterial\_v2](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial_v2) - Better loading of settings from gltf files / textures
* Improvement:  [Ops.Gl.Performance](https://cables.gl/op/Ops.Gl.Performance) - Much more realistic results for GPU timing numbers, in some cases they are still very wrong, probably blame webgl query timer or GPU driver....
* Improvement:  [Ops.Gl.Phong.SpotLight\_v5](https://cables.gl/op/Ops.Gl.Phong.SpotLight_v5) - Show second translate gizmo for better control
* Improvement:  [Ops.Gl.TextureArrayLoaderFromArray\_v4](https://cables.gl/op/Ops.Gl.TextureArrayLoaderFromArray_v4) - Faster and less thread blocking loading of images
* Improvement:  [Ops.Gl.TextureArray\_v2](https://cables.gl/op/Ops.Gl.TextureArray_v2) - New version: multiport, dynamic number of input textures
* Improvement:  [Ops.Gl.Texture\_v3](https://cables.gl/op/Ops.Gl.Texture_v3) - Faster and less thread blocking loading of images
* Improvement:  [Ops.Gl.Textures.WebcamTexture\_v4](https://cables.gl/op/Ops.Gl.Textures.WebcamTexture_v4) - Texture will only be updated when there was a new frame available to capture from the webcam
* Improvement:  [Ops.Graphics.Geometry.GeometryExtrude\_v3](https://cables.gl/op/Ops.Graphics.Geometry.GeometryExtrude_v3) - Even better normals! Now it can have smooth normals
* Improvement:  [Ops.Graphics.GeometryMergeSimple\_v2](https://cables.gl/op/Ops.Graphics.GeometryMergeSimple_v2) - New version v2: multiport op instead of only two meshes
* Improvement:  [Ops.Graphics.Transform](https://cables.gl/op/Ops.Graphics.Transform) - Overlay dot will now display the op comment
* Improvement:  [Ops.Html.CSS.BackgroundImage\_v2](https://cables.gl/op/Ops.Html.CSS.BackgroundImage_v2) - Added input port to set background image or mask image
* Improvement:  [Ops.Html.CSS.CSSPropertyString](https://cables.gl/op/Ops.Html.CSS.CSSPropertyString) - Show property in extended title
* Improvement:  [Ops.Html.CSS.ElementSize](https://cables.gl/op/Ops.Html.CSS.ElementSize) - Add vh and vw to size units
* Improvement:  [Ops.Html.CSS.SetCssVariableNumber](https://cables.gl/op/Ops.Html.CSS.SetCssVariableNumber) - Update output when changing suffix
* Improvement:  [Ops.Html.CSS.SwitchClass](https://cables.gl/op/Ops.Html.CSS.SwitchClass) - Show information in extended title
* Improvement:  [Ops.Html.Elements.VideoElement](https://cables.gl/op/Ops.Html.Elements.VideoElement) - Add volume controls / golabl volume listener
* Improvement:  [Ops.Json.HttpRequest\_v4](https://cables.gl/op/Ops.Json.HttpRequest_v4) - Skip sending Content-Type header for GET/HEAD, greyout parameters [github.com](https://github.com/cables-gl/cables/issues/8339)
* Improvement:  [Ops.Json.ObjectGetString\_v2](https://cables.gl/op/Ops.Json.ObjectGetString_v2) - Add option to output key for missing values
* Improvement:  [Ops.Json.ObjectStringify\_v2](https://cables.gl/op/Ops.Json.ObjectStringify_v2) - Show a warning if the connected object port does not contain an object
* Improvement:  [Ops.Sidebar.ColorPickerNative](https://cables.gl/op/Ops.Sidebar.ColorPickerNative) - Add option to toggle visibility
* Improvement:  [Ops.Sidebar.ColorPicker\_v3](https://cables.gl/op/Ops.Sidebar.ColorPicker_v3) - Add option to toggle visibility
* Improvement:  [Ops.Sidebar.ColorPicker\_v3](https://cables.gl/op/Ops.Sidebar.ColorPicker_v3) - Output the picker HTML element
* Improvement:  [Ops.String.Concat\_v3](https://cables.gl/op/Ops.String.Concat_v3) - New version v3: multiport by default
* Improvement:  [Ops.String.File.SwitchFile\_v3](https://cables.gl/op/Ops.String.File.SwitchFile_v3) - New version v3: multiport input of files
* Improvement:  [Ops.String.LineBreaksHtml](https://cables.gl/op/Ops.String.LineBreaksHtml) - Added active toggle
* Improvement:  [Ops.TimeLine.AnimInfo](https://cables.gl/op/Ops.TimeLine.AnimInfo) - Output keys of anim as array
* Improvement:  [Ops.Ui.VizArrayTable\_v2](https://cables.gl/op/Ops.Ui.VizArrayTable_v2) - Increase zoom distance when pausing drawing on patchfield
* Improvement:  [Ops.Ui.VizArrayTable\_v2](https://cables.gl/op/Ops.Ui.VizArrayTable_v2) - Show name of connected port for better readability
* Improvement:  [Ops.Ui.VizNumber](https://cables.gl/op/Ops.Ui.VizNumber) - Show name of connected port for better readability
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Added option to toggle auto hiding many items in arrays
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Increase zoom distance when pausing drawing on patchfield
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Show a warning if the connected port is not a valid object
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Show name of connected port for better readability
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Use custom stringify (was called experimental before) for simple objects, JSON.stringify for class instances, because it isfaster
* New op: [Ops.Array.Curves.CurveEditor](https://cables.gl/op/Ops.Array.Curves.CurveEditor) - Edit a simple curve
* New op:  [Ops.Array.Curves.CurveEditorArray](https://cables.gl/op/Ops.Array.Curves.CurveEditorArray) - Edit a simple curve and output as array of numbers
* New op: [Ops.Array.PointArray.Array3PointEditor\_v2](https://cables.gl/op/Ops.Array.PointArray.Array3PointEditor_v2) - Create an array from multiple number inputs
* New op: [Ops.Array.PointArray.Unstrip](https://cables.gl/op/Ops.Array.PointArray.Unstrip) - Unstrip a line point array
* New op:  [Ops.Audio.GlobalVolume](https://cables.gl/op/Ops.Audio.GlobalVolume) - Adjusts the volume of all audio ops
* New op:  [Ops.Boolean.Or\_v2](https://cables.gl/op/Ops.Boolean.Or_v2) - Outputs true if one of the input values is true (boolean)
* New op:  [Ops.Cables.Ops.GetOpsByTag](https://cables.gl/op/Ops.Cables.Ops.GetOpsByTag) - Get a list of ops that have a specific tag
* New op: [Ops.Cables.Ops.OpsLoadingStatus](https://cables.gl/op/Ops.Cables.Ops.OpsLoadingStatus) - Get loading status of an array of ops
* New op: [Ops.Cables.PatchFileList](https://cables.gl/op/Ops.Cables.PatchFileList) - Outputs an array of filenames, that are uploaded to the current patch
* New op: [Ops.Devices.Mouse.CustomClick](https://cables.gl/op/Ops.Devices.Mouse.CustomClick) - Configurable mouse click listener
* New op:  [Ops.Extension.FontKit.FontParser](https://cables.gl/op/Ops.Extension.FontKit.FontParser) - Loads a font file, parses it with fontkit.js, and lays out a text string into individual glyph outlines.
* New op:  [Ops.Extension.FontKit.GlyphAxisMorph](https://cables.gl/op/Ops.Extension.FontKit.GlyphAxisMorph) - Pre-calculates glyph outlines at axis min and max values, then interpolates coordinates arithmetically at render time — zero fontkit calls per frame.
* New op:  [Ops.Extension.FontKit.GlyphCombine](https://cables.gl/op/Ops.Extension.FontKit.GlyphCombine) - Takes the per-glyph SVG paths and positions arrays and reconstructs a single combined SVG path string, ready for triangulation
* New op:  [Ops.Extension.FontKit.GlyphTransformAnim](https://cables.gl/op/Ops.Extension.FontKit.GlyphTransformAnim) - Applies geometric transformations per glyph via an array of values. Purely geometric — does not need the font, only Glyph Paths + Glyph Positions.
* New op:  [Ops.Extension.Standalone.CloseApplication](https://cables.gl/op/Ops.Extension.Standalone.CloseApplication) - Close cables standalone on trigger
* New op: [Ops.Extension.Standalone.DesktopTexture](https://cables.gl/op/Ops.Extension.Standalone.DesktopTexture) - Capture desktop windows or screens as a texture DesktopTexture
* New op: [Ops.Gl.GLTF.GltfLoadedTexture](https://cables.gl/op/Ops.Gl.GLTF.GltfLoadedTexture) - Load textures from inside a .glb file
* New op: [Ops.Gl.GLTF.GltfMaterialUseProperties](https://cables.gl/op/Ops.Gl.GLTF.GltfMaterialUseProperties) - Use GLTF material properties of a material on the current shader
* New op: [Ops.Gl.GLTF.GltfNodeTransformation](https://cables.gl/op/Ops.Gl.GLTF.GltfNodeTransformation) - Get the transform from the GLTFscene op
* New op:  [Ops.Gl.GLTF.GltfTextureTest](https://cables.gl/op/Ops.Gl.GLTF.GltfTextureTest) - Show specific GLTF texture channels as color texture
* New op: [Ops.Gl.GLTF.GltfToggleVisibility](https://cables.gl/op/Ops.Gl.GLTF.GltfToggleVisibility) - Toggle visibility of GLTF nodes
* New op: [Ops.Gl.GLTF.KtxCompression](https://cables.gl/op/Ops.Gl.GLTF.KtxCompression) - Load a KTX file as a texture
* New op: [Ops.Gl.GLTF.KtxCompression\_v2](https://cables.gl/op/Ops.Gl.GLTF.KtxCompression_v2) - Load a KTX file as a texture
* New op: [Ops.Gl.ImageCompose.Noise.Grain](https://cables.gl/op/Ops.Gl.ImageCompose.Noise.Grain) - Film Grain look noise
* New op: [Ops.Gl.Matrix.MultiplyProjectionMatrix\_v2](https://cables.gl/op/Ops.Gl.Matrix.MultiplyProjectionMatrix_v2) - Multiply view matrix
* New op: [Ops.Gl.ShaderEffects.ShadowPass](https://cables.gl/op/Ops.Gl.ShaderEffects.ShadowPass) - Route trigger differently when in shadowpass or not
* New op: [Ops.Gl.ShaderEffects.ShadowPass\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.ShadowPass_v2) - Route trigger differently when in shadowpass or not
* New op: [Ops.Graphics.Geometry.GeometryMapTexCoords](https://cables.gl/op/Ops.Graphics.Geometry.GeometryMapTexCoords) - Simple method to generate texture coordinates from object vertex coordinates
* New op: [Ops.Html.CSS.CSSPropertyVariable](https://cables.gl/op/Ops.Html.CSS.CSSPropertyVariable) - Use a CSS variable in a css property of an element
* New op:  [Ops.Html.CSS.ElementSize](https://cables.gl/op/Ops.Html.CSS.ElementSize) - Set Size of a HTML element
* New op:  [Ops.Html.Elements.ElementQuery](https://cables.gl/op/Ops.Html.Elements.ElementQuery) - Find all matching elements by query in the DOM
* New op: [Ops.Json.ObjectDeepSearch](https://cables.gl/op/Ops.Json.ObjectDeepSearch) - Search for any value anywhere in an object
* New op: [Ops.String.MarkdownLinks](https://cables.gl/op/Ops.String.MarkdownLinks) - Replace Words as links in markdown strings
* New op:  [Ops.TimeLine.AnimGetDataArrays](https://cables.gl/op/Ops.TimeLine.AnimGetDataArrays) - Get data of an animation as arrays
* New op:  [Ops.TimeLine.EaseAnimCurve](https://cables.gl/op/Ops.TimeLine.EaseAnimCurve) - Ease a value between 0 and 1 over a timeline curve
* New op:  [Ops.Ui.VizAudioSpectrum](https://cables.gl/op/Ops.Ui.VizAudioSpectrum) - Vizualize an audionode object spectrum
* New op:  [Ops.Ui.VizAudioWaveform](https://cables.gl/op/Ops.Ui.VizAudioWaveform) - Vizualize an audionode object as a waveform
* New op:  [Ops.Vars.VariablesFromObject](https://cables.gl/op/Ops.Vars.VariablesFromObject) - Set existing variables to values in an object
* New op:  [Ops.Website.LocalStorageKeys](https://cables.gl/op/Ops.Website.LocalStorageKeys) - Retrieve all keys (and values) stored in browser storage
* Rename:  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer) - Html.Elements.AudioMediaElement renamed to  [Ops.Audio.AudioPlayer](https://cables.gl/op/Ops.Audio.AudioPlayer)
* Rename:  [Ops.Boolean.Or\_v2](https://cables.gl/op/Ops.Boolean.Or_v2) - Boolean.OrMultiPort renamed to  [Ops.Boolean.Or\_v2](https://cables.gl/op/Ops.Boolean.Or_v2)
* Rename:  [Ops.Gl.Matrix.MultiplyProjectionMatrix](https://cables.gl/op/Ops.Gl.Matrix.MultiplyProjectionMatrix) - Gl.Matrix.SetProjectionMatrix renamed to  [Ops.Gl.Matrix.MultiplyProjectionMatrix](https://cables.gl/op/Ops.Gl.Matrix.MultiplyProjectionMatrix)
* Rename: [Ops.Gl.ShaderEffects.TransformArea](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea) - Gl.ShaderEffects.VertexArea renamed to [Ops.Gl.ShaderEffects.TransformArea](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea)
* Rename:  [Ops.Gl.ShaderEffects.TransformArea\_v2](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea_v2) - Gl.ShaderEffects.VertexArea renamed to  [Ops.Gl.ShaderEffects.TransformArea](https://cables.gl/op/Ops.Gl.ShaderEffects.TransformArea)
* Rename:  [Ops.Sidebar.ColorPickerNative](https://cables.gl/op/Ops.Sidebar.ColorPickerNative) - Sidebar.ColorPicker\_v2 renamed to  [Ops.Sidebar.ColorPickerNative](https://cables.gl/op/Ops.Sidebar.ColorPickerNative)
* Rename:  [Ops.Trigger.RouteTrigger\_v2](https://cables.gl/op/Ops.Trigger.RouteTrigger_v2) - New version v2: Multiport outputs by default

#### Unreleased Ops

#### Website

* Bugfix: Fix permission-check for teammembers when restoring backups
* Feature: Add summary field to teams, show in overview of public teams
* Feature: Add more information to project log, make log-view collapsable
* Feature: New concept of "temporary patches" (new empty patches, restored backups, ...) they are listed in tab on "My Patches" page
* Feature: Add bulk delete to op-changelog editing mode
* Improvement: Add "Clone Patch" to patch page and mypatches lists [github.com](https://github.com/cables-gl/cables/issues/7520)
* Improvement: Show op creation date and time on oppage
* Improvement: Properly show linebreaks in markdown of team description
* Improvement: Add numbers to backups, show in restore and download. Tweak backup intervals.
* Improvement: Add option to restore backups pointing to original patch assets
* Improvement: Add team-info to patchlist page, Show team visibility as text on team page
* Improvement: Fix duplicate inclusion of op dependencies in export
* Improvement: Do not increment export count when creating backup of projects
* Improvement: Add url-field to op-changelog form [github.com](https://github.com/cables-gl/cables/issues/8142)
* Improvement: Disallow deletion of example patches, add warning
* Improvement: Cleanup layout of team page and team-overview pages
* Improvement: Show icon next to op name if op has an example on ops overview page
* Improvement: Link public teams to my teams and vice versa
* Improvement: Add icon to unlisted teams
* Improvement: Reorganize /myteams, add tabs
* Improvement: Suggest deprecated ops on "op not found" page for ops of the same name

#### Editor

* Bugfix: Prevent creating ops with illegal names
* Bugfix: Fix name and link to team for extensions in opselect
* Bugfix: Fix bug with extendet title not showing when falsish value [github.com](https://github.com/cables-gl/cables/issues/8237)
* Bugfix: Fix bug in updating ui when disconnecting multiplayer client
* Bugfix: Popout canvas did not work correctly when adding elements to the patch, because of wrong container element [github.com](https://github.com/cables-gl/cables/issues/8203)
* Bugfix: Fix project-settings tabs sometimes not clickable
* Bugfix: Fix "take screenshot now" button, was not working in some cases
* Feature: Filemanager: highlight latest uploaded file
* Feature: Make op dependencies editable in editor
* Feature: Restoring a backup will restore ui attributes of patch (e.g. bookmarks)
* Feature: Drawcall profiler: new view to see what drawcalls to webgl are currently executed
* Feature: Overlay transforms can now display text
* Feature: Math ops now show variablenames when directly set to port
* Feature: Ops can now be tagged, those tags can be queried by ops for meta patch functionality
* Feature: Allow upload of binary as an op-dependency (i.e. for WASM) [github.com](https://github.com/cables-gl/cables/issues/8183)
* Feature: Mute audio will be stored in user preferences now. Added new commands for mute/unmute audio. Muted audio icon is highlighted in the canvas UI bar [github.com](https://github.com/cables-gl/cables/issues/8199)
* Feature: Filemanager: Files are greyed out if not used in current patch
* Feature: Vizualisation ops are also suggested when clicking on a cable
* Feature: Added user preference to switch the text editor, added basic support for codemirror and a simple textarea editor
* Feature: Gradient editor: Added button to reverse all keys in current gradient
* Feature: Gradient editor: Added simple presets
* Feature: Selected op connected cables now have a brighter outline and are move visible when zoomed out
* Feature: Op suggestions based on objtype, e.g. audio object outputs
* Feature: No longer taking a screenshot when changing from automatic to manual screenshots in patch settings
* Feature: Add a new Canvas floating mode, param panel then becomes full height
* Improvement: Optimize performance spikes when selecting huge amounts of ops
* Improvement: Text editor appearance will be greyed out when not currently focussed
* Improvement: Port suggestions in opselect dialog now shows "variable in port" to directly get variable values into a port without creating a var get op
* Improvement: Left Tabpanel/Editor can now be toggled using cmd/ctrl+b hotkey
* Improvement: Search toggle: ":animated" search only over ops that have animated ports
* Improvement: Tooltips are no longer positioned outside of the browser window/ parameter panel tooltips for input ports [github.com](https://github.com/cables-gl/cables/issues/8242)
* Improvement: Allow team-users to see file-infos for uploaded assets
* Improvement: Switched code/text/string editors: Removed ACE editor and switched to CodeMirror 6
* Improvement: Op search improve colors for loadable op collections (teams/extensions)
* Improvement: Gradient editor draggable points would not register a "pointer up" event [github.com](https://github.com/cables-gl/cables/issues/8202)
* Improvement: Fixed size of patchbg canvas and cmd+enter now cycles between normal->patchgg->maximized [github.com](https://github.com/cables-gl/cables/issues/8211)
* Improvement: File manager removes current selection filter when switching to another op
* Improvement: Ignore new annoying chrome pointerlock exceptions
* Improvement: Notify UI of file-upload via cables-cli and refresh file ports [github.com](https://github.com/cables-gl/cables/issues/8164)
* Improvement: Export: Remove reference to non-existant sourcemaps from non-minified exports
* Improvement: Optimize shader compilation time, by only checking valid link status when shader is actually used
* Improvement: Speed up subpatch op saving when reloading multiple instances of op
* Improvement: Changed the zoom for centering ops (c) and clicking findresult to be more zoomed out
* Improvement: Editor does not force timeline to play after loading the ui
* Improvement: Load op-dependency only once per patch, preventing lot's of requests for parent-op
* Improvement: Mesh ops show an X in the op title when drawing is deactivated
* Improvement: Optimized loading time for patches with many materials/shadermods and effects, only compile shaders when they are needed
* Improvement: Rework import and backup-restore workflow, option to not restore/import op-code
* Improvement: Store canvas mode in user preferences, restore when opening the editor

#### Standalone

* Bugfix: Do not show intro-tour / hints when started as fullscreen or maximized
* Bugfix: Fix bug where creation of new op was not possible until new project was re-opened once
* Bugfix: Fix copypaste of local ops into subpatch ops
* Bugfix: Fix export not working in some cases
* Bugfix: Prevent op-errors when entering directories or files with no permission in file-ports
* Feature: Add usersetting to open popout- and external-canvas in a transparent window (pull request by Uuoocl, thank you!)
* Feature: Add commandline parameters to control screen/offset to open window
* Feature: Fix bug when selecting aspect ratio of canvas
* Feature: Fix location of extension ops when developing in cables-development setup
* Improvement: Remove version number from name of executable, always show version number in title
* Improvement: Build Windows executable in seperate files (not one "portable" exe)

#### Timeline

* Bugfix: When clicking an op, the timeline scrolls, so the line is visible
* Feature: Anim title line: Added buttons to jump next/previous keyframe and to add new ones
* Feature: Anim title line: Added value display and functionality to manipulate values by dragging

[![screenshot Ops.Array.Curves.CurveEditorArray](https://cables.gl/op/screenshot/Ops.Array.Curves.CurveEditorArray.png)](https://cables.gl/op/Ops.Array.Curves.CurveEditorArray)![op Ops.Array.Curves.CurveEditorArray](https://cables.gl/api/op/layout/Ops.Array.Curves.CurveEditorArray.svg)

[![screenshot Ops.Audio.GlobalVolume](https://cables.gl/op/screenshot/Ops.Audio.GlobalVolume.png)](https://cables.gl/op/Ops.Audio.GlobalVolume)![op Ops.Audio.GlobalVolume](https://cables.gl/api/op/layout/Ops.Audio.GlobalVolume.svg)

[![screenshot Ops.Boolean.Or_v2](https://cables.gl/op/screenshot/Ops.Boolean.Or_v2.png)](https://cables.gl/op/Ops.Boolean.Or_v2)![op Ops.Boolean.Or_v2](https://cables.gl/api/op/layout/Ops.Boolean.Or_v2.svg)

[![screenshot Ops.Cables.Ops.GetOpsByTag](https://cables.gl/op/screenshot/Ops.Cables.Ops.GetOpsByTag.png)](https://cables.gl/op/Ops.Cables.Ops.GetOpsByTag)![op Ops.Cables.Ops.GetOpsByTag](https://cables.gl/api/op/layout/Ops.Cables.Ops.GetOpsByTag.svg)

[![screenshot Ops.Extension.FontKit.FontParser](https://cables.gl/op/screenshot/Ops.Extension.FontKit.FontParser.png)](https://cables.gl/op/Ops.Extension.FontKit.FontParser)![op Ops.Extension.FontKit.FontParser](https://cables.gl/api/op/layout/Ops.Extension.FontKit.FontParser.svg)

[![screenshot Ops.Extension.FontKit.GlyphAxisMorph](https://cables.gl/op/screenshot/Ops.Extension.FontKit.GlyphAxisMorph.png)](https://cables.gl/op/Ops.Extension.FontKit.GlyphAxisMorph)![op Ops.Extension.FontKit.GlyphAxisMorph](https://cables.gl/api/op/layout/Ops.Extension.FontKit.GlyphAxisMorph.svg)

[![screenshot Ops.Extension.FontKit.GlyphCombine](https://cables.gl/op/screenshot/Ops.Extension.FontKit.GlyphCombine.png)](https://cables.gl/op/Ops.Extension.FontKit.GlyphCombine)![op Ops.Extension.FontKit.GlyphCombine](https://cables.gl/api/op/layout/Ops.Extension.FontKit.GlyphCombine.svg)

[![screenshot Ops.Extension.FontKit.GlyphTransformAnim](https://cables.gl/op/screenshot/Ops.Extension.FontKit.GlyphTransformAnim.png)](https://cables.gl/op/Ops.Extension.FontKit.GlyphTransformAnim)![op Ops.Extension.FontKit.GlyphTransformAnim](https://cables.gl/api/op/layout/Ops.Extension.FontKit.GlyphTransformAnim.svg)

[![screenshot Ops.Extension.Standalone.CloseApplication](https://cables.gl/op/screenshot/Ops.Extension.Standalone.CloseApplication.png)](https://cables.gl/op/Ops.Extension.Standalone.CloseApplication)![op Ops.Extension.Standalone.CloseApplication](https://cables.gl/api/op/layout/Ops.Extension.Standalone.CloseApplication.svg)

[![screenshot Ops.Gl.GLTF.GltfTextureTest](https://cables.gl/op/screenshot/Ops.Gl.GLTF.GltfTextureTest.png)](https://cables.gl/op/Ops.Gl.GLTF.GltfTextureTest)![op Ops.Gl.GLTF.GltfTextureTest](https://cables.gl/api/op/layout/Ops.Gl.GLTF.GltfTextureTest.svg)

[![screenshot Ops.Html.CSS.ElementSize](https://cables.gl/op/screenshot/Ops.Html.CSS.ElementSize.png)](https://cables.gl/op/Ops.Html.CSS.ElementSize)![op Ops.Html.CSS.ElementSize](https://cables.gl/api/op/layout/Ops.Html.CSS.ElementSize.svg)

[![screenshot Ops.Html.Elements.ElementQuery](https://cables.gl/op/screenshot/Ops.Html.Elements.ElementQuery.png)](https://cables.gl/op/Ops.Html.Elements.ElementQuery)![op Ops.Html.Elements.ElementQuery](https://cables.gl/api/op/layout/Ops.Html.Elements.ElementQuery.svg)

[![screenshot Ops.TimeLine.AnimGetDataArrays](https://cables.gl/op/screenshot/Ops.TimeLine.AnimGetDataArrays.png)](https://cables.gl/op/Ops.TimeLine.AnimGetDataArrays)![op Ops.TimeLine.AnimGetDataArrays](https://cables.gl/api/op/layout/Ops.TimeLine.AnimGetDataArrays.svg)

[![screenshot Ops.TimeLine.EaseAnimCurve](https://cables.gl/op/screenshot/Ops.TimeLine.EaseAnimCurve.png)](https://cables.gl/op/Ops.TimeLine.EaseAnimCurve)![op Ops.TimeLine.EaseAnimCurve](https://cables.gl/api/op/layout/Ops.TimeLine.EaseAnimCurve.svg)

[![screenshot Ops.Ui.VizAudioSpectrum](https://cables.gl/op/screenshot/Ops.Ui.VizAudioSpectrum.png)](https://cables.gl/op/Ops.Ui.VizAudioSpectrum)![op Ops.Ui.VizAudioSpectrum](https://cables.gl/api/op/layout/Ops.Ui.VizAudioSpectrum.svg)

[![screenshot Ops.Ui.VizAudioWaveform](https://cables.gl/op/screenshot/Ops.Ui.VizAudioWaveform.png)](https://cables.gl/op/Ops.Ui.VizAudioWaveform)![op Ops.Ui.VizAudioWaveform](https://cables.gl/api/op/layout/Ops.Ui.VizAudioWaveform.svg)

[![screenshot Ops.Vars.VariablesFromObject](https://cables.gl/op/screenshot/Ops.Vars.VariablesFromObject.png)](https://cables.gl/op/Ops.Vars.VariablesFromObject)![op Ops.Vars.VariablesFromObject](https://cables.gl/api/op/layout/Ops.Vars.VariablesFromObject.svg)

[![screenshot Ops.Website.LocalStorageKeys](https://cables.gl/op/screenshot/Ops.Website.LocalStorageKeys.png)](https://cables.gl/op/Ops.Website.LocalStorageKeys)![op Ops.Website.LocalStorageKeys](https://cables.gl/api/op/layout/Ops.Website.LocalStorageKeys.svg)

---

 -

#### Ops

* New op: [Ops.Array.PointArray.Unstrip](https://cables.gl/op/Ops.Array.PointArray.Unstrip) - Unstrip an line point array
* New op: [Ops.Extension.Standalone.DesktopTexture](https://cables.gl/op/Ops.Extension.Standalone.DesktopTexture) - Capture desktop windows or screens as a texture DesktopTexture
* New op: [Ops.Gl.GLTF.GltfMaterialUseProperties](https://cables.gl/op/Ops.Gl.GLTF.GltfMaterialUseProperties) - Use GLTF material properties of a material on the current shader
* New op: [Ops.Gl.ShaderEffects.ShadowPass](https://cables.gl/op/Ops.Gl.ShaderEffects.ShadowPass) - Route trigger differently when in shadowpass or not
* New op: [Ops.Html.CSS.CSSPropertyVariable](https://cables.gl/op/Ops.Html.CSS.CSSPropertyVariable) - Use a CSS variable in a css property of an element
* New op:  [Ops.Html.CSS.ElementSize](https://cables.gl/op/Ops.Html.CSS.ElementSize) - Set position left/right/top/bottom of a HTML element
* New op:  [Ops.Html.Elements.ElementQuery](https://cables.gl/op/Ops.Html.Elements.ElementQuery) - Selects all matching elements in the DOM
* New op: [Ops.Json.ObjectDeepSearch](https://cables.gl/op/Ops.Json.ObjectDeepSearch) - Search for any value anywhere in an object
* New op:  [Ops.TimeLine.EaseAnimCurve](https://cables.gl/op/Ops.TimeLine.EaseAnimCurve) - Ease a value between 0 and 1 over a timeline curve
* New op:  [Ops.Ui.VizAudioSpectrum](https://cables.gl/op/Ops.Ui.VizAudioSpectrum) - Vizualize an audionode object spectrum
* New op:  [Ops.Ui.VizAudioWaveform](https://cables.gl/op/Ops.Ui.VizAudioWaveform) - Vizualize an audionode object as a waveform
* New op:  [Ops.Vars.VariablesFromObject](https://cables.gl/op/Ops.Vars.VariablesFromObject) - Set existing variables to values in an object
* New op:  [Ops.Website.LocalStorageKeys](https://cables.gl/op/Ops.Website.LocalStorageKeys) - Retrieve all keys (and values) stores in localstorage
* Feature:  [Ops.Extension.Standalone.Files.WriteTextFile](https://cables.gl/op/Ops.Extension.Standalone.Files.WriteTextFile) - Auto write file when string changes
* Feature:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - Basic automatic loading and usage of embedded textures
* Feature:  [Ops.Gl.ImageCompose.ColorChannel\_v3](https://cables.gl/op/Ops.Gl.ImageCompose.ColorChannel_v3) - New version v3: added option to easily switch colorchannels and/or set specific channels to zero or one
* Feature:  [Ops.Gl.Pbr.PbrMaterial](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial) - Added option to multiply albedo texture with diffuse color
* Feature:  [Ops.Gl.Shader.BasicMaterial\_v3](https://cables.gl/op/Ops.Gl.Shader.BasicMaterial_v3) - Rendering of textures from gltf files
* Feature:  [Ops.TimeLine.TimeLinePlay](https://cables.gl/op/Ops.TimeLine.TimeLinePlay) - Added trigger to toggle between play/pause
* Feature:  [Ops.Ui.CablesEditorEvents](https://cables.gl/op/Ops.Ui.CablesEditorEvents) - Added events to trigger, when op created/deleted, port linked etc
* Feature:  [Ops.Ui.VizTexture](https://cables.gl/op/Ops.Ui.VizTexture) - Option to debug by only visualizing one RGB channel
* Feature:  [Ops.Ui.VizTexture](https://cables.gl/op/Ops.Ui.VizTexture) - Option to visualize RGBE encoded images
* Improvement:  [Ops.Extension.OpenType.OpentypeToSvgPath](https://cables.gl/op/Ops.Extension.OpenType.OpentypeToSvgPath) - Added support for line breaks, added line height parameter
* Improvement:  [Ops.Extension.Standalone.Files.PathToFileUrl](https://cables.gl/op/Ops.Extension.Standalone.Files.PathToFileUrl) - Treat relative paths as relative to patch dir
* Improvement:  [Ops.Extension.Standalone.Files.SelectFile](https://cables.gl/op/Ops.Extension.Standalone.Files.SelectFile) - Treat relative paths as relative to patch dir
* Improvement:  [Ops.Extension.Standalone.Files.SystemDirs](https://cables.gl/op/Ops.Extension.Standalone.Files.SystemDirs) - Add patchdir output port
* Improvement:  [Ops.Extension.Standalone.Files.WriteTextFile](https://cables.gl/op/Ops.Extension.Standalone.Files.WriteTextFile) - Resolve relative paths to patch directory, add output port
* Improvement:  [Ops.Extension.Standalone.Net.ReadTextFile](https://cables.gl/op/Ops.Extension.Standalone.Net.ReadTextFile) - Resolve relative paths to patch directory, add output port
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v4](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v4) - When hiding nodes, all nodes with that name will be hidden, not only the first
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - New Version 5: "Use Material Properties" is enables by default
* Improvement:  [Ops.Gl.GLTF.GltfScene\_v5](https://cables.gl/op/Ops.Gl.GLTF.GltfScene_v5) - When hiding nodes, all nodes with that name will be hidden, not only the first
* Improvement:  [Ops.Gl.Pbr.PbrMaterial](https://cables.gl/op/Ops.Gl.Pbr.PbrMaterial) - Better loading of settings from gltf files / textures
* Improvement:  [Ops.Graphics.Geometry.GeometryExtrude\_v3](https://cables.gl/op/Ops.Graphics.Geometry.GeometryExtrude_v3) - Even better normals! Now it can have smooth normals
* Improvement:  [Ops.Json.ObjectStringify\_v2](https://cables.gl/op/Ops.Json.ObjectStringify_v2) - Show a warning if the connected object port does not contain an object
* Improvement:  [Ops.Ui.VizArrayTable\_v2](https://cables.gl/op/Ops.Ui.VizArrayTable_v2) - Increase zoom distance when pausing drawing on patchfield
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Increase zoom distance when pausing drawing on patchfield
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Show a warning if the connected port is not a valid object
* Improvement:  [Ops.Ui.VizObject](https://cables.gl/op/Ops.Ui.VizObject) - Use custom stringify (was called experimental before) for simple objects, JSON.stringify for class instances, because it isfaster
* Bugfix:  [Ops.Gl.ArrayToTexture\_v2](https://cables.gl/op/Ops.Gl.ArrayToTexture_v2) - Fixed bug where animated textures would be deleted before being used
* Bugfix:  [Ops.Gl.CubeMap.Skybox](https://cables.gl/op/Ops.Gl.CubeMap.Skybox) - Fix problems not rendering anything when used below renderToTextures op
* Bugfix: [Ops.TimeLine.TimeLineFrame\_v2](https://cables.gl/op/Ops.TimeLine.TimeLineFrame_v2) - New Version v2: Using timeline config FPS for frame calculation from timeline time
* Bugfix:  [Ops.Ui.VizBool](https://cables.gl/op/Ops.Ui.VizBool) - Fix bug when op is resized to very small
* Deprecation:  [Ops.Extension.Deprecated.Array.ShuffleArray3](https://cables.gl/op/Ops.Extension.Deprecated.Array.ShuffleArray3) - Op Array.ShuffleArray3 was deprecated
* Deprecation:  [Ops.Extension.Deprecated.Array.ShuffleArray3](https://cables.gl/op/Ops.Extension.Deprecated.Array.ShuffleArray3) - Op Extension.Deprecated.ShuffleArray3 was deprecated
* Deprecation:  [Ops.Extension.Deprecated.Array.ShuffleArray3\_v2](https://cables.gl/op/Ops.Extension.Deprecated.Array.ShuffleArray3_v2) - Op Array.ShuffleArray3\_v2 was deprecated
* Deprecation:  [Ops.Extension.Deprecated.Array.ShuffleArray3\_v2](https://cables.gl/op/Ops.Extension.Deprecated.Array.ShuffleArray3_v2) - Op Extension.Deprecated.ShuffleArray3\_v2 was deprecated
* Deprecation:  [Ops.Extension.Deprecated.Array.ShuffleArray3\_v3](https://cables.gl/op/Ops.Extension.Deprecated.Array.ShuffleArray3_v3) - ShuffleArray3\_v3 was deprecated please use shuffle array with the stride parameter!
* Deprecation: [Ops.Extension.Deprecated.ExtContactPairsNope](https://cables.gl/op/Ops.Extension.Deprecated.ExtContactPairsNope) - Op Extension.Rapier3d.ContactPairsNope was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackGetArray](https://cables.gl/op/Ops.Extension.Deprecated.StackGetArray) - Op Data.StackValues.StackGetArray was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackGetNumber](https://cables.gl/op/Ops.Extension.Deprecated.StackGetNumber) - Op Data.StackValues.StackGetNumber was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackGetTexture](https://cables.gl/op/Ops.Extension.Deprecated.StackGetTexture) - Op Data.StackValues.StackGetTexture was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackPushArray](https://cables.gl/op/Ops.Extension.Deprecated.StackPushArray) - Op Data.StackValues.StackPushArray was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackPushNumber](https://cables.gl/op/Ops.Extension.Deprecated.StackPushNumber) - Op Data.StackValues.StackPushNumber was deprecated
* Deprecation:  [Ops.Extension.Deprecated.StackPushTexture](https://cables.gl/op/Ops.Extension.Deprecated.StackPushTexture) - Op Data.StackValues.StackPushTexture was deprecated

#### Editor

* Canvas floating mode, param panel full height
* Changed the coom for centering ops (c) and clicking findresult to be more zoomed out
* Editor does not force timeline to play after loading the ui
* Load op-dependency only once per patch, preventing lot's of requests for parent-op
* Meshes show an X as extended title when drawing is deactivated
* Optimized performance for patches with many materials/shadermods and effects
* Rework import and backup-restore workflow, option to not restore/import op-code
* Store canvas mode in user preferences

#### Website

* Add bulk delete to op-changelog editing mode
* Add icon to unlisted teams
* Fix permission-check for teammembers when restoring backups
* Reorganize /myteams, add tabs
* Show team visibility as text on team page
* Suggest deprecated ops on "op not found" page for ops of the same name

#### Standalone

* Add support for desktoptexture ops - [Ops.Extension.Standalone.DesktopTexture](https://cables.gl/op/Ops.Extension.Standalone.DesktopTexture)
* Build Windows executable in seperate files (not one "portable" exe)
* Do not show intro-tour / hints when started as fullscreen or maximized
* Fix copypaste of local ops into subpatch ops
* Fix export not working in some cases
* Prevent op-errors when entering directories or files with no permission in file-ports

[![screenshot Ops.Html.CSS.ElementSize](https://cables.gl/op/screenshot/Ops.Html.CSS.ElementSize.png)](https://cables.gl/op/Ops.Html.CSS.ElementSize)![op Ops.Html.CSS.ElementSize](https://cables.gl/api/op/layout/Ops.Html.CSS.ElementSize.svg)

[![screenshot Ops.Html.Elements.ElementQuery](https://cables.gl/op/screenshot/Ops.Html.Elements.ElementQuery.png)](https://cables.gl/op/Ops.Html.Elements.ElementQuery)![op Ops.Html.Elements.ElementQuery](https://cables.gl/api/op/layout/Ops.Html.Elements.ElementQuery.svg)

[![screenshot Ops.TimeLine.EaseAnimCurve](https://cables.gl/op/screenshot/Ops.TimeLine.EaseAnimCurve.png)](https://cables.gl/op/Ops.TimeLine.EaseAnimCurve)![op Ops.TimeLine.EaseAnimCurve](https://cables.gl/api/op/layout/Ops.TimeLine.EaseAnimCurve.svg)

[![screenshot Ops.Ui.VizAudioSpectrum](https://cables.gl/op/screenshot/Ops.Ui.VizAudioSpectrum.png)](https://cables.gl/op/Ops.Ui.VizAudioSpectrum)![op Ops.Ui.VizAudioSpectrum](https://cables.gl/api/op/layout/Ops.Ui.VizAudioSpectrum.svg)

[![screenshot Ops.Ui.VizAudioWaveform](https://cables.gl/op/screenshot/Ops.Ui.VizAudioWaveform.png)](https://cables.gl/op/Ops.Ui.VizAudioWaveform)![op Ops.Ui.VizAudioWaveform](https://cables.gl/api/op/layout/Ops.Ui.VizAudioWaveform.svg)

[![screenshot Ops.Vars.VariablesFromObject](https://cables.gl/op/screenshot/Ops.Vars.VariablesFromObject.png)](https://cables.gl/op/Ops.Vars.VariablesFromObject)![op Ops.Vars.VariablesFromObject](https://cables.gl/api/op/layout/Ops.Vars.VariablesFromObject.svg)

[![screenshot Ops.Website.LocalStorageKeys](https://cables.gl/op/screenshot/Ops.Website.LocalStorageKeys.png)](https://cables.gl/op/Ops.Website.LocalStorageKeys)![op Ops.Website.LocalStorageKeys](https://cables.gl/api/op/layout/Ops.Website.LocalStorageKeys.svg)
