import React, { useState } from "react";

import FormField from "../components/CustomForm/FormField";
import Button from "../components/CustomButton/CustomButton";

import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import images from "../constants/images";

const Register = () => {
  return (
    <div
      className="w-11/12 h-[60vh] max-w-3xl bg-sidebar rounded-xl shadow-md flex overflow-hidden"
    > 
      
      <div 
        className="hidden sm:block w-2/5 bg-purple relative"
        style={{
          backgroundImage: `url('${images["bg_dead_forest"]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img 
          src={images["knight_run_gif"]}
          className="absolute top-3/8 left-1/11 w-70 h-70 object-cover pointer-events-none"
        />
      </div>

      <div className="px-10 py-15 flex-1">
        {/* register form here */}
        <p className="text-4xl text-yellow font-accent tracking-wide font-medium"> 
          Create a hero profile  
        </p>
        <p className="text-5xl text-yellow font-accent tracking-wide font-medium mt-5"> 
          🌟  
        </p>
        <div className="flex-row mt-7 px-3">
          <FormField 
            label=""
            name="email"
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="your email"
            required={true}
            className="mb-3"
            fullWidth={true}
          />
          <FormField 
            label=""
            name="password"
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="password"
            required={true}
            className="mb-3"
            fullWidth={true}
          />
          <FormField 
            label=""
            name="password"
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="confirm password"
            required={true}
            className="mb-3"
            fullWidth={true}
          />
        </div>

        <div className="mt-10 px-3">
          <Button 
            title="Sign up"
            icon="🚀"
            size="lg"
            fullWidth={true}
          />
          <p className="mt-2 text-sm text-gray tracking-wider">
            Already has an account? Sign in here
          </p>
        </div>
        
        
      </div>
      
    </div>
  )
};

export default Register;