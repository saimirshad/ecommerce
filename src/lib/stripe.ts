import {Stripe, loadStripe} from "@stripe/stripe-js"



let stripePrmoise: Promise<Stripe| null>
export const getStripePromise = () => {
    const key =  "pk_test_51KmFBzIBJu9wdzvArNLZsE9MyrHR8vYxtb7oFRdgXX4kdRabY4Y7Ot94ns2iTc1tL0bpOWiAb0RBMFAMGXWXqiJs00g1iPKSlR"
    if(!stripePrmoise && !!key){
        stripePrmoise = loadStripe(key)

    }

    return stripePrmoise
}