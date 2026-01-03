"use client";
import React from "react";
import axios from "axios";
import { randomUUID } from "crypto";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Loader, SendHorizonal } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { suggestions } from "@/data/constants";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Hero() {
  const [loading, setLoading] = React.useState(false);
  const [userInput, setUserInput] = React.useState<string>();
  const [device, setDevice] = React.useState<string>("website");
  const { user } = useUser();
  const {
    actor,
    getToken,
    has,
    isLoaded,
    isSignedIn,
    sessionClaims,
    sessionId,
    signOut,
    userId,
  } = useAuth();
  const router = useRouter();

  const onCreateProject = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    // Create New Project.
    if (!userInput) return;
    setLoading(true);
    const projectId = crypto.randomUUID();
    const result = await axios.post("/api/project", {
      userInput,
      device,
      projectId,
    });

    console.log(result.data);
    setLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
        <span
          className={cn(
            "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
          )}
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "subtract",
            WebkitClipPath: "padding-box",
          }}
        />
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
        <AnimatedGradientText className="text-sm font-medium">
          Introducing Magic UI
        </AnimatedGradientText>
        <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </div>
      <h2
        style={{
          fontSize: "5rem",
          lineHeight: "0.89",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Rapidly build <span style={{ fontWeight: "bolder" }}>Website</span> and{" "}
        <span style={{ fontWeight: "bolder" }}>Mobile</span> application
        designs.
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "gray",
          marginTop: "10px",
          fontSize: "1rem",
        }}
      >
        Turn ideas into reality.
      </p>

      <div className="flex gap-6 items-center justify-center">
        <InputGroup style={{ width: "600px", marginTop: "40px" }}>
          <InputGroupTextarea
            data-slot="input-group-control"
            className="flex field-sizing-content min-h-24 w-full resize-none rounded-md bg-transparent px-3 py-4 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Type your design to start creating..."
            value={userInput}
            onChange={(e) => setUserInput(e.target?.value)}
          />
          <InputGroupAddon align="block-end">
            <Select
              defaultValue="website"
              onValueChange={(value) => setDevice(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
            <InputGroupButton
              className="ml-auto"
              disabled={loading}
              size="sm"
              variant="default"
              onClick={() => onCreateProject()}
            >
              {loading ? <Loader /> : <SendHorizonal />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex gap-5 mt-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 border rounded-2xl flex flex-col items-center cursor-pointer"
            onClick={() => setUserInput(suggestion?.description)}
          >
            <h2 className="text-lg">{suggestion?.icon}</h2>
            <h2 className="text-center line-clamp-2 text-sm">
              {suggestion?.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
