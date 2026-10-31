---
source: https://web.archive.org/web/2016id_/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
title: "2D Water"
fetched: 2026-10-28
---

2D Water

# 2D Water

---

:   A little while ago, I saw an impressive effect. I have no idea who invented it, but that
    person deserves plenty of respect, and exciting presents at christmas. This effect was a
    simulation of water ripples on a surface. You could touch the water at any point, and watch the
    ripples radiate out, and even reflect off the walls. Now, this in itself is not that impressive.
    It's easy to achieve that effect with the sum of sin functions. The amazing thing was the speed.
    the program ran at full speed no matter how many ripples you made.:   Fortunately the source code was included. It took some time to figure out how it worked. There
        seemed to be no sin or cos functions or lookup tables. Indeed the only thing in the main loop was,
        what seemed to be, some kind of sharpening or smoothing filter.:   I wrote my own, and indeed, this mysterious filter seems to work 'like voodoo magic' as one
            friend put it. Given 2 arrays of integers, applying this filter caused ripples to propagate
            outwards from any disturbances made in the arrays.

            ---

            So how does this algorithm work then?
            Well, firstly, you'll need 2 arrays of words (integers). Yes, that's right, words, not bytes.
            These arrays will hold the state of the water. One holds the current state, the other holds the
            state from the previous frame. It is important that you have 2 arrays, since you need to know
            how the water has changed since the last frame, and the frame before that.

            |  |  |  |  |  |
            | --- | --- | --- | --- | --- |
            |  |  |  |  |  |

            |  |  |
            | --- | --- |
            | Data from the previous frame (Buffer2) and the frame before that (Buffer1) are used together, and the results written into Buffer1.  Buffer1 contains the current state of the water. | Data from the previous frame (Buffer1) and the frame before that (Buffer2) are used together, and the results written into Buffer2.  Buffer2 contains the current state of the water. |

            |  |
            | --- |
            | ```     damping = some non-integer between 0 and 1    begin loop        for every non-edge element:       loop           Buffer2(x, y) = (Buffer1(x-1,y)                            Buffer1(x+1,y)                            Buffer1(x,y+1)                            Buffer1(x,y-1)) / 2 - Buffer2(x,y)             Buffer2(x,y) = Buffer2(x,y) * damping       end loop        Display Buffer2       Swap the buffers     end loop  ``` |

            ![](https://web.archive.org/web/20160607052007id_/http:/freespace.virgin.net/hugo.elias/graphics/x_water4.gif)

            :   To explain how and why this works, imagine a wave traveling across a 1-Dimensional surface (wave 0).
                This wave is traveling to the left. The small vertical arrows indicate the rate at which the
                water level changes with time. The fainter waves show the wave's positions on previous frames.
                So how do we achieve the correct changes in height for each part of the wave (vertical arrows)?

                :   You may notice that the height of the wave two frames older (wave 2), is proportional to
                    the size of the arrows. So as long as the previous two frames are remembered, it is easy to work
                    out the change in height of every part of the wave.:   So, take a look at the code again. When the loop starts, Buffer1 contains the state of the
                        water from the previous frame (wave 1), and Buffer2 has the state before that (wave 2). Buffer2
                        therefore has information about the vertical velocity of the wave.

                        ```
                        
                        	Velocity(x, y) = -Buffer2(x, y)
                        ```

                        It is also important for the waves to spread out, so the buffers are smoothed every frame.

                        ```
                        
                        	Smoothed(x,y) = (Buffer1(x-1, y) +
                        	                 Buffer1(x+1, y) +
                        	                 Buffer1(x, y-1) +
                        	                 Buffer1(x, y+1)) / 4
                        ```

                        Now, to combine the two to calculate the new height of the water. The multiplication by two
                        reduces the effect of the velocity.

                        ```
                        
                        	NewHeight(x,y) = Smoothed(x,y)*2 + Velocity(x,y)
                        ```

                        Finally, the ripples must lose energy, so they are damped:

                        ```
                        
                        	NewHeight(x,y) = NewHeight(x,y) * damping
                        ```

                        Note: This can be optimised to:

                        ```
                        
                        	NewHeight(x,y) = NewHeight(x,y) - (NewHeight(x,y)/n)
                        ```

                        where n is some power of 2.

                        ---

                        :   So, when you put all that together, you end up with some reasonably fast code. Here's the important
                            inner loop written in C.

                            |  |
                            | --- |
                            | ```       void ProcessWater(short *source, short *dest)     {         int i;          for (i=320; i<64000-320; i++)         {             dest[i] = (     	                ((source[i-1]+                           source[i+1]+                           source[i-320]+                           source[i+320])  >>1) )	-dest[i];              dest[i] -= (dest[i] >> 5);         }     } ``` |

                            ---

                            Rendering the Water

                            :   So, having coded this all up, how do you go about rendering it?:   Well, the buffers each contaian height map representing the height of the water at each pixel.
                                    As you may have guessed, there are many ways you can go about rendering a height field, but, in this
                                    case, an easy and effective method is to do simple shading and refraction. You will need a texture
                                    to go behind the water, so you can see the refraction.

                                    |  |
                                    | --- |
                                    | ```     for every pixel (x,y) in the buffer      Xoffset = buffer(x-1, y) - buffer(x+1, y)     Yoffset = buffer(x, y-1) - buffer(x, y+1)      Shading = Xoffset      t = texture(x+Xoffset, y+Yoffset)      p = t + Shading      plot pixel at (x,y) with colour p    end loop  ``` |

                                    **Notes:** This method is by no means a highly accurate simulation of rippling water (though
                                    it is not too far off). Ripples can pass through each other quite happily, and will reflect off
                                    the walls. One thing you may notice, however, is that the ripples are not quite circular.

                                    ---

                                    [![](https://web.archive.org/web/20160607052007id_/http:/freespace.virgin.net/hugo.elias/graphics/ripples.gif)](https://web.archive.org/web/20160607052007id_/http:/freespace.virgin.net/hugo.elias/graphics/ripples.zip)
                                    Here's a little demo of raindrops
                                    falling into a rockpool. I have implemented shading and refraction to complete the effect.
                                    As usual it requires DOS/4GW to run.
