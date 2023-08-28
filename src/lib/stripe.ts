import {Stripe, loadStripe} from "@stripe/stripe-js"



let stripePrmoise: Promise<Stripe| null>
export const getStripePromise = () => {
    const key =  "pk_test_51NiwhVLKKF9jsgNxYSzjlsU5Oyfsg47uZakL0eQefCxsAUk6l4h2VDypoTcTnKDxlVMSXBAqOmkLEnntBjCk4Gse00GxPLJ4d9"
    if(!stripePrmoise && !!key){
        stripePrmoise = loadStripe(key)

    }

    return stripePrmoise
}