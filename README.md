## Yokoten Input

According to lean management, Yokoten is a way to Act the resolution of a PDCA/Kaizen,
by sharing the knowledge to another team.

It is not done so the people can copy and paste the result but to make people aware of
the issue and to be capable of adapting the process of resolution to a new problem solving. 

# Context

On a project, the following story happens

1. the PO want a sexier app, so we made a brainstorming session
2. in the session, we decided to animate the input
3. in planing we found a library that was doing a material like input
4. when doing the ticket, one dev, let say **T.**, saw that the plugin need adaption to work with our form infrastructure
5. **T.** copy/pasted the code, adapt it minimally so it works, forget to remove dead code, but it "just worked"™
6. later, another devolpper, let say **L.** was aiming to prefill the input with value
7. that breaked the empty input that wasn't animating, until the user typed one char
8. the PO was frustrated by the bug

In this yokoten, we are going to study the time where the regression happened, at step 7.
My goal is to communicate how this bug makes me a better react native dev.

# Repo organisation

- The `master` branch is the playground, ie the code before step 1. Look at it a be sure you understand the context, it is well documentated
- Then go to the `wrong-process` branch where I did reproduced the bad devlopment process we made, in a minimal bugging code
- Then go to the `one-right-process` branch when  I did reproduced a right devlopment process, that could have help us avoiding the regression

*App icon so licence CC-0*
