var assert = require('assert');
import { expect } from 'chai';
import sinon from 'sinon'
import zenroom from '../src/wrapper'

const encrypt_secret_to_many = {
    zencode: `keyring = ECDH.new()
    secret = str(DATA)
    keys = JSON.decode(KEYS)
    keyring:private( base64(keys.keyring.secret) )
    res = {}
    for name,pubkey in pairs(keys.recipients) do
       pub = base64(pubkey)
       enc = ECDH.encrypt(keyring,pub,secret,keyring:public())
       res[name] = str( MSG.pack( map(enc,base64) ) ):base64()
    end
    print(JSON.encode(res))`,
    keys: {
        "keyring" : {
           "public" : "BHMjcDM/aljpi8pNxFQ436R6F3J+kaB/Xk1kAVFPmkoLVyeFltDZPgiIYRquh+m2IfvPioBfet7YCd5vVXYoRTk=",
           "secret" : "ChW5qi5y//ISDIHKx5Fvxl+XY8IyDGVBHUfELp3PqJQ="
        },
        "recipients" : {
           "paulus" : "BBUw6Nr3A30cN65maERvAk1cEv2Ji6Vs80kSlpodOC0SCtM8ucaS7e+s158uVMSr3BsvIXVspBeafiL8Qb3kcgc=",
           "mayo" : "BHqBoQ2WJ3/FGVNTXzdIc+K/HzNx05bWzEhn8m58FvSsaqWVdH52jI6fQWdkdjnbqVKCJGmbjA/OCJ+IKHbiySI=",
           "mark" : "BFgkjrRMvN+wkJ6qA4UvMaNlYBvl37C9cNYGkqOE4w43AUzkEzcyIIdE6BrgOEUEVefhOOnO6SCBQMgXHXJUUPY=",
           "francesca" : "BCo102mVybieKMyhex8tnVtFM5+Wo1oP02k8JVwKF9OLIjw7w0LmofItbuAcfWl9rcoe++XLI3sySZnqljIfeyU=",
           "jim" : "BEs1jeqL0nVwFi7OmG4YdtlWuKADyOvZR4XHpLAEswg8ONPXQHvwJ8+PkHkphoORfSjk2045bMdYkwboU4FdG2Y=",
           "jaromil" : "BBZYJtHvFg0vGCxPROAWrThcGZ+vFZJj86k+uncjvbm4DysIg7cWS3J6GrcJKCY55Uf40m2KfBwfaT+T7TTO1e8="
        }
     },
     data: 'This is a secret message.'
}

describe('Zenroom module', function() {
    beforeEach(function() {
        sinon.spy(console, 'log')
        sinon.spy(console, 'error')
        zenroom.reset()
    })

    afterEach(function() {
        console.log.restore()
        console.error.restore()
    })
    
    it('should import work and be an object', function() {
        assert(zenroom)
    })

    it('should zenroom have exposed all public method', function() {
        const z = zenroom.init()
        expect(z).to.be.an('object').to.have.all.keys("conf data exec error init keys print success verbosity zencode __debug reset".split(' '))
    })

    it('should zenroom initialize script', function() {
        const z = zenroom.init({script: 'print("hello")'})
        expect(console.log.called).to.be.false
    })

    it('should zenroom exec script', function() {
        const z = zenroom.zencode('print("hello")').exec()
        expect(z).to.be.an('object')
        expect(console.log.calledOnce).to.be.true
        expect(console.log.calledWithExactly('hello')).to.be.true
    })

    it('should zenroom execute script with init', function() {
        zenroom.init({zencode: 'print("hello")'}).exec()
        expect(console.log.calledOnce).to.be.true
    })

    it('should zenroom execute correctly with data and keys', function() {
        zenroom
            .zencode(encrypt_secret_to_many.zencode)
            .keys(encrypt_secret_to_many.keys)
            .data(encrypt_secret_to_many.data)
            .exec()
        const result = JSON.parse(console.log.args[0][0])
        expect(result).to.have.all.keys("paulus mayo mark jim jaromil francesca".split(" "))
        expect(console.log.calledOnce).to.be.true
    })

    it('should zencode method work correctly', function() {
        const zencode = 'print("hello")'
        const options = zenroom.zencode(zencode).__debug()
        expect(options.zencode).to.be.equal(zencode)
    })

    it('should conf method work correctly', function() {
        const conf = 'this monday is super monday'
        const options = zenroom.conf(conf).__debug()
        expect(options.conf).to.be.equal(conf)
    })

    it('should data method work correctly', function() {
        const data = 'This is my DATA'
        const options = zenroom.data(data).__debug()
        expect(options.data).to.be.equal(data)
    })

    it('should keys method work correctly', function() {
        const keys = {a:1, b:2}
        const options = zenroom.keys(keys).__debug()
        const keysResult = JSON.parse(options.keys)
        expect(keysResult).to.have.all.keys('a', 'b')
        expect(keysResult).to.include(keys)
    })

    it('should verbosity method work correctly', function() {
        const options = zenroom.verbosity(2).__debug()
        expect(options.verbosity).to.be.equal(2)
    })

    it('should initialize with correct params', function() {
        const data = {data: "some data"}
        const options = zenroom.init(data).__debug()
        expect(options.options).to.include(data)
    })

    it('should execute the error method on error', function() {
        let errorExecuted = false;
        const zencode = "broken script on purpose"
        const error = () => {
            errorExecuted = true
        }
        zenroom.zencode(zencode).error(error).exec()
        expect(errorExecuted).to.be.true
    })

    it('should execute the reset correctly', function() {
        let options = zenroom.init(encrypt_secret_to_many).__debug()
        expect(options.data).to.be.equal(encrypt_secret_to_many.data)
        options = zenroom.reset().__debug()
        expect(options.data).to.be.equal(undefined)
        expect(options.error).to.not.throw()
    })

    it('should work error method with init also', function() {
        let errorExecuted = false; 
        zenroom.init({
            zencode: "broken script on purpose",
            error: () => { errorExecuted = true }
        }).exec()
        expect(errorExecuted).to.be.true
    })

    it('should execute the success method on success', function() {
        let executed = false;
        const zencode = 'print("hello")'
        const success = () => {
            executed = true
        }
        zenroom.zencode(zencode).success(success).exec()
        expect(executed).to.be.true
    })
});