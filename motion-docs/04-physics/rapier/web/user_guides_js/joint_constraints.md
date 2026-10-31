---
source: https://rapier.rs:443/docs/user_guides/javascript/joint_constraints
title: "Joint constraints | Rapier"
fetched: 2026-10-28
---

# Joint constraints

In practice, there are two main ways of modeling joints:

* Reduced-coordinates approach.
* Constraints-based approach.

## Reduced-coordinates approach[â](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints/#reduced-coordinates-approach "Direct link to Reduced-coordinates approach")

The **reduced-coordinates approach** encodes the reduction of DOF directly into the equations of motion. For example,
a 3D rigid-body attached to the ground with a revolute joint will have its position encoded by only one variable: the
rotation angle. Therefore, integrating its motion only changes this one variable and doesn't need additional forces or
mathematical constraints to be generated. The clear advantage is that there is no way for the physics engine to apply
any motion other than that single rotation to this body, meaning there is no way the body shifts to a position that is
not realistic, even if the dynamics solver does not converge completely.

Rapier implements this approach through `MultibodyJointSet`,
where each joint is attached to its relevant rigid-bodies identified by their handle.

## Constraints-based approach[â](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints/#constraints-based-approach "Direct link to Constraints-based approach")

The **constraints-based approach** (or full-coordinates approach) is the most commonly available approach on other
physics engines for video-games and animations. Here, a 3D rigid-body attached to the ground with a revolute joint will
still have its position encoded by 6 variables (3 for translations and 3 for rotations) just like any rigid-body without
a joint. Then the integrator will add mathematical constraints to the dynamic system to ensure forces are applied to
simulate the reduction of the number of DOF as imposed by the joints. In practice, this means that the rigid-body will
break the joint constraint if the constraint solver does not converge completely.

Rapier implements this approach through `ImpulseJointSet`,
where each joint is attached to two distinct rigid-bodies identified by their rigid-body handles.

---

More generally, the reduced-coordinates approach favors accuracy while the constraints-based approach favors versatility.

The following table compares the advantages and limitations of both approaches:

| Reduced-coordinates approach | Constraints-based approach |
| --- | --- |
| Joints cannot be violated at all. | Joints can be violated if the solver does not converge. |
| Moderately large time-steps are possible. | Moderately large time-steps may make the simulation explode. |
| Large assemblies are stable. | Large assemblies easily break without a large number of solver iterations. |
| Adding/removing a joint is slow. | Adding/removing a joint is fast. |
| Joint forces are never computed explicitly, thus cannot be retrieved. | Joint forces are always computed and can be retrieved. |
| Topological restriction: bodies must be linked following a tree structure. | The link between bodies can form any graph. |

The following schematics illustrate a configuration that can be simulated by a multibody (left assembly with a tree structure),
and one that cannot (right assembly with a graph structure). The assembly on the left models a SCARA robotic arm with 3
rotational DOF (due to three revolute joints) and 1 translational DOF (due to one prismatic joint). The assembly on the
right models a necklace with five pearls. It has a total of 15 rotational DOF (due to five ball joints):

![Tree-like assembly](https://rapier.rs:443/assets/images/assembly_examples-906cd66e4f281e1eab078d25c582e534.svg)

"Which approach should I use?"

The choice of approach **depends on the application**. For **robotics**, the **reduced-coordinates** approach is
generally preferred because of its accuracy and ease of use, e.g., for control, inverse kinematics, etc.

---

**Video games** traditionally favor the **constraints-based** approach since most existing physics libraries implement
only this. Moreover if joint assemblies are small, and joints are frequently added and removed, the constraints-based
approach will be more efficient. Some other physics libraries implement the reduced-coordinates approach as well but often
using the Featherstone algorithm which is extremely unstable in practice.

---

Simulating **closed loops** like for a necklace cannot be achieved with the reduced-coordinates approach only. However,
it is possible to combine both approaches by using joint constraints only to close the loops. Refer to the [last section](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints#combining-both)
for details.

## Multibodies[â](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints/#multibodies "Direct link to Multibodies")

Multibodies implement the reduced-coordinates approach. A multibody is a set of **multibody links** attached together by
a **multibody joint**.

### Creating a multibody[â](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints/#creating-a-multibody "Direct link to Creating a multibody")

The API to create a Multibody joint is similar to creating an Impulse Joint, refer to [Joints](https://rapier.rs:443/docs/user_guides/javascript/joints),
but insert those into the physics world with `World.createMultibodyJoint` (instead of `World.createImpulseJoint`).

See [Rapier's example](https://github.com/dimforge/rapier/blob/v017.1/examples3d/joints3.rs) for a demonstration of both approaches.

## Combining both[â](https://rapier.rs:443/docs/user_guides/javascript/joint_constraints/#combining-both "Direct link to Combining both")

A joint constraint geometry is completely configured at its creation, and added to the world by the
`World.createImpulseJoint` method (resp. `World.createMultibodyJoint`) by specifying the rigid-bodies the joint is
attached to.

Combining multibodies and joint constraints is a useful way of combining the stability of multibodies with the flexibility of joint constraints. Indeed, one of the most appealing features of a multibody is its stability and ease of use (especially for robotics). However its greatest weakness is its inability to represent assemblies that do not match a tree structure, i.e., an articulated body composed of graph-like assembly of solids (each graph node being a solid and each graph edge being an articulation) cannot be simulated by a multibody. A common approach is thus to:

1. Define a multibody from a spanning-tree of the graph.
2. Create joint constraints for each articulation missing from this multibody to complete the graph. Those joint constraints are therefore attached to two multibody links. They are often called "loop-closing constraints" since they close the loops of the assembly's graph structure.

The following shows an example of combination of multibodies and joint constraints for the simulation of a necklace. It is composed of 5 pearls forming a single loop attached together by 5 ball joints. Since such a loop cannot be simulated by a multibody, we first start to create 5 multibody links attached together with 4 `BallJoint`. Only 4 joints can be added here since a 5th would close the loop.
The 5th joint that closes the loop must be modeled as a joint constraint, here a `BallConstraint` between the first and the last link:

![Loop-closing constraint](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjQ0MnB4IiBoZWlnaHQ9IjI5NnB4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS41OyI+CiAgICA8cGF0aCBkPSJNMTk0LjA2NCwxOC4zNzdDMTk0LjA2NCwxOC4zNzcgMzAyLjI2NywtMC4xODUgMzAyLjI0Miw4My4xMSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDIyMiwxMTYsMjAxKTtzdHJva2Utd2lkdGg6NC4xN3B4O3N0cm9rZS1kYXNoYXJyYXk6NC4xNyw4LjMzLDAsMDsiLz4KICAgIDx0ZXh0IHg9IjMxLjIyOHB4IiB5PSI1MS43MzdweCIgc3R5bGU9ImZvbnQtZmFtaWx5OidBcmlhbE1UJywgJ0FyaWFsJywgc2Fucy1zZXJpZjtmb250LXNpemU6MTguMzc2cHg7ZmlsbDpyZ2IoMjI2LDAsMCk7Ij5CYWxsIGpvaW50PC90ZXh0PgogICAgPHRleHQgeD0iNzkuMzQ0cHgiIHk9IjE3Ny4zMjVweCIgc3R5bGU9ImZvbnQtZmFtaWx5OidBcmlhbE1UJywgJ0FyaWFsJywgc2Fucy1zZXJpZjtmb250LXNpemU6MTguMzc2cHg7ZmlsbDpyZ2IoMCwzMywyNTUpOyI+QmFsbCBqb2ludDwvdGV4dD4KICAgIDx0ZXh0IHg9IjE4MS43MDRweCIgeT0iMTc3LjMyNXB4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0FyaWFsTVQnLCAnQXJpYWwnLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxOC4zNzZweDtmaWxsOnJnYigyNDMsMTI2LDApOyI+QmFsbCBqb2ludDwvdGV4dD4KICAgIDx0ZXh0IHg9IjEyNi42MDVweCIgeT0iMjkxLjk3cHgiIHN0eWxlPSJmb250LWZhbWlseTonQXJpYWxNVCcsICdBcmlhbCcsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE4LjM3NnB4O2ZpbGw6cmdiKDAsMTg0LDQ4KTsiPkJhbGwgam9pbnQ8L3RleHQ+CiAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNODAuNjksMjI4LjIwOUw2MS45MDksMTkwLjAwMyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgICAgICA8cGF0aCBkPSJNNDguMzIyLDE4MS44MzhDNDguOTcxLDE3NS44ODQgNTQuMjI5LDE3MS41NjUgNjAuMDU4LDE3Mi4yQzY1Ljg4NiwxNzIuODM1IDcwLjA5MSwxNzguMTg1IDY5LjQ0MywxODQuMTM5QzY4Ljc5NCwxOTAuMDkzIDYzLjUzNSwxOTQuNDEyIDU3LjcwNywxOTMuNzc3QzUxLjg3OCwxOTMuMTQyIDQ3LjY3MywxODcuNzkyIDQ4LjMyMiwxODEuODM4WiIgc3R5bGU9ImZpbGw6cmdiKDAsMzMsMjU1KTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgICAgICA8cGF0aCBkPSJNNDkuNDY0LDE5NS41NzJDNDUuNDMzLDE5Mi4zMjMgNDMuMDg2LDE4Ny4wODUgNDMuNjk3LDE4MS40NzlDNDQuNjQxLDE3Mi44MTYgNTIuMjkyLDE2Ni41MzMgNjAuNzcyLDE2Ny40NTdDNjcuMTU2LDE2OC4xNTMgNzIuODYsMTc0LjA0OCA3NC41NjEsMTc5Ljk2OCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgICAgICA8cGF0aCBkPSJNMzguNDk1LDEzOS4xOUw1MS45NCwxNjguODAyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS42N3B4OyIvPgogICAgPC9nPgogICAgPGc+CiAgICAgICAgPHBhdGggZD0iTTIxMi45MzksMjQ2LjY1OUwxNzAuMzkzLDI0OC4xNzYiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPHBhdGggZD0iTTE1Ny4zODYsMjU3LjIzN0MxNTIuMjE4LDI1NC4yMSAxNTAuNDI3LDI0Ny42NDUgMTUzLjM5LDI0Mi41ODZDMTU2LjM1MywyMzcuNTI3IDE2Mi45NTQsMjM1Ljg3NiAxNjguMTIzLDIzOC45MDNDMTczLjI5MSwyNDEuOTMgMTc1LjA4MiwyNDguNDk1IDE3Mi4xMTksMjUzLjU1NEMxNjkuMTU2LDI1OC42MTMgMTYyLjU1NSwyNjAuMjYzIDE1Ny4zODYsMjU3LjIzN1oiIHN0eWxlPSJmaWxsOnJnYigwLDE4NCw0OCk7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPHBhdGggZD0iTTE3MC4zODcsMjYxLjgxQzE2NS43NzQsMjY0LjE2IDE2MC4wMzQsMjY0LjE2IDE1NS4xNjgsMjYxLjMxQzE0Ny42NDgsMjU2LjkwNyAxNDUuMDQzLDI0Ny4zNTYgMTQ5LjM1MywyMzkuOTk1QzE1Mi41OTksMjM0LjQ1MyAxNjAuMzExLDIzMS42NTggMTY2LjQwOSwyMzIuNTI3IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS42N3B4OyIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMTQuNDQ5LDI0OC43NjZMMTQ2Ljk3LDI0OC42MDUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICA8L2c+CiAgICA8Zz4KICAgICAgICA8cGF0aCBkPSJNMjkwLjk2MywxMzkuMTlMMjc1LjAyNCwxNzguNjY3IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS42N3B4OyIvPgogICAgICAgIDxwYXRoIGQ9Ik0yNzguMDAzLDE5NC4yMzZDMjczLjEzNCwxOTcuNzI1IDI2Ni40MDksMTk2LjY4NyAyNjIuOTk0LDE5MS45MjFDMjU5LjU4LDE4Ny4xNTUgMjYwLjc2MSwxODAuNDUzIDI2NS42MywxNzYuOTY1QzI3MC40OTksMTczLjQ3NyAyNzcuMjI0LDE3NC41MTUgMjgwLjYzOCwxNzkuMjgxQzI4NC4wNTMsMTg0LjA0NyAyODIuODcyLDE5MC43NDggMjc4LjAwMywxOTQuMjM2WiIgc3R5bGU9ImZpbGw6cmdiKDI0MywxMjYsMCk7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPHBhdGggZD0iTTI4Ny40NzQsMTg0LjIyNUMyODcuNzQyLDE4OS4zOTUgMjg1LjQwNSwxOTQuNjM3IDI4MC44MiwxOTcuOTIyQzI3My43MzYsMjAyLjk5NiAyNjMuOTUyLDIwMS40ODcgMjU4Ljk4NCwxOTQuNTUzQzI1NS4yNDQsMTg5LjMzMiAyNTUuODMyLDE4MS4xNSAyNTkuMTA4LDE3NS45MzQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPHBhdGggZD0iTTI1Mi43ODIsMjMwLjAwNEwyNjUuODc3LDIwMC4yMzYiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICA8L2c+CiAgICA8ZWxsaXBzZSBjeD0iMzIuNTc0IiBjeT0iMTE5LjU3NCIgcng9IjMxLjc0MSIgcnk9IjMxLjY2NyIgc3R5bGU9ImZpbGw6cmdiKDIzNSwyMzUsMjM1KTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgIDxjaXJjbGUgY3g9IjI0NC42MjgiIGN5PSIyNDcuODQ4IiByPSIzMS42ODgiIHN0eWxlPSJmaWxsOnJnYigyMzUsMjM1LDIzNSk7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICA8ZWxsaXBzZSBjeD0iOTEuMzMzIiBjeT0iMjQ3LjgyNiIgcng9IjMxLjc0MSIgcnk9IjMxLjY2NyIgc3R5bGU9ImZpbGw6cmdiKDIzNSwyMzUsMjM1KTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgIDxlbGxpcHNlIGN4PSIyOTcuMjc0IiBjeT0iMTE0LjcyNSIgcng9IjMxLjY4OCIgcnk9IjMxLjYxNSIgc3R5bGU9ImZpbGw6cmdiKDIzNSwyMzUsMjM1KTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgIDxlbGxpcHNlIGN4PSIxNjguNjgzIiBjeT0iMzIuNDQ4IiByeD0iMzEuNjg4IiByeT0iMzEuNjE1IiBzdHlsZT0iZmlsbDpyZ2IoMjM1LDIzNSwyMzUpO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS42N3B4OyIvPgogICAgPHRleHQgeD0iMTQ1LjE3OXB4IiB5PSIzOS4wNTJweCIgc3R5bGU9ImZvbnQtZmFtaWx5OidBcmlhbE1UJywgJ0FyaWFsJywgc2Fucy1zZXJpZjtmb250LXNpemU6MTguMzc2cHg7Ij5MaW5rIDE8L3RleHQ+CiAgICA8dGV4dCB4PSIyNzMuNzdweCIgeT0iMTIxLjMyOXB4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0FyaWFsTVQnLCAnQXJpYWwnLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxOC4zNzZweDsiPkxpbmsgNTwvdGV4dD4KICAgIDx0ZXh0IHg9IjIyMS45NDNweCIgeT0iMjU0LjU0N3B4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0FyaWFsTVQnLCAnQXJpYWwnLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxOC4zNzZweDsiPkxpbmsgNDwvdGV4dD4KICAgIDx0ZXh0IHg9IjY2LjU1OXB4IiB5PSIyNTQuMzEzcHgiIHN0eWxlPSJmb250LWZhbWlseTonQXJpYWxNVCcsICdBcmlhbCcsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE4LjM3NnB4OyI+TGluayAzPC90ZXh0PgogICAgPHRleHQgeD0iOS4wNjlweCIgeT0iMTI2LjE3OHB4IiBzdHlsZT0iZm9udC1mYW1pbHk6J0FyaWFsTVQnLCAnQXJpYWwnLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxOC4zNzZweDsiPkxpbmsgMjwvdGV4dD4KICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Ik01OS41OTMsMTAyLjM0NEw5NS41NCw3OS41MzUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPGVsbGlwc2UgY3g9IjEwMi4xODUiIGN5PSI3NS43NjciIHJ4PSIxMC44NTIiIHJ5PSIxMC42MjMiIHN0eWxlPSJmaWxsOnJnYigyMjYsMCwwKTtzdHJva2U6YmxhY2s7c3Ryb2tlLXdpZHRoOjEuNjdweDsiLz4KICAgICAgICA8cGF0aCBkPSJNODguNjU2LDY3Ljc2NkM5MS40NDksNjMuNDA4IDk2LjQwMiw2MC41MDcgMTAyLjA0MSw2MC41MDdDMTEwLjc1NSw2MC41MDcgMTE3LjgzLDY3LjQzMyAxMTcuODMsNzUuOTYzQzExNy44Myw4Mi4zODUgMTEyLjU4OCw4OC42OTQgMTA2Ljg4Niw5MS4wMjYiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxLjY3cHg7Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0My41MTgsNTAuNzU1TDExNS41MzYsNjcuMzI5IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpibGFjaztzdHJva2Utd2lkdGg6MS42N3B4OyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNjc1MjksMCwwLDAuMzY3NTI5LC0zNy42NjY1LC00OTkuMjIzKSI+CiAgICAgICAgPHRleHQgeD0iOTYyLjEzNHB4IiB5PSIxNDU0LjE0cHgiIHN0eWxlPSJmb250LWZhbWlseTonQXJpYWxNVCcsICdBcmlhbCcsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjUwcHg7ZmlsbDpyZ2IoMjIyLDExNiwyMDEpOyI+QmFsbENvbnN0cmFpbnQ8L3RleHQ+CiAgICAgICAgPHRleHQgeD0iOTMxLjU1NnB4IiB5PSIxNDg5LjI3cHgiIHN0eWxlPSJmb250LWZhbWlseTonQXJpYWxNVCcsICdBcmlhbCcsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjM0LjAxMXB4O2ZpbGw6cmdiKDIyMiwxMTYsMjAxKTsiPihMb29wLWNsb3NpbmcgY29uc3RyYWludCk8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPg==)
