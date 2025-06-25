
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import lspData from "@/data/lspData";

type SearchCommandProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SearchCommand = ({ isOpen, setIsOpen }: SearchCommandProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Close command with Escape key
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  const handleSelect = (item: string) => {
    setIsOpen(false);
    
    // Find the LSP by name
    const selectedLSP = lspData.find(lsp => lsp.name === item);
    
    if (selectedLSP) {
      navigate(`/lsp/${selectedLSP.id}`);
    } else {
      // If it's not an LSP name, it might be a specialization or location
      navigate(`/directory?search=${encodeURIComponent(item)}`);
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput 
        placeholder="Search LSPs, specializations, or locations..." 
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* LSP Names */}
        {searchTerm && (
          <CommandGroup heading="Legal Service Providers">
            {lspData
              .filter(lsp => 
                lsp.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map(lsp => (
                <CommandItem 
                  key={lsp.id} 
                  onSelect={() => handleSelect(lsp.name)}
                  value={lsp.name}
                >
                  {lsp.name}
                </CommandItem>
              ))
            }
          </CommandGroup>
        )}
        
        {/* Specializations */}
        {searchTerm && (
          <CommandGroup heading="Specializations">
            {Array.from(new Set(lspData.flatMap(lsp => lsp.specialization)))
              .filter(spec => 
                spec.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map(spec => (
                <CommandItem 
                  key={spec} 
                  onSelect={() => handleSelect(spec)}
                  value={spec}
                >
                  {spec}
                </CommandItem>
              ))
            }
          </CommandGroup>
        )}
        
        {/* Locations */}
        {searchTerm && (
          <CommandGroup heading="Locations">
            {Array.from(new Set(lspData.map(lsp => lsp.location.state)))
              .filter(state => 
                state.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map(state => (
                <CommandItem 
                  key={state} 
                  onSelect={() => handleSelect(state)}
                  value={state}
                >
                  {state}
                </CommandItem>
              ))
            }
            {Array.from(new Set(lspData.map(lsp => lsp.location.city)))
              .filter(city => 
                city.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map(city => (
                <CommandItem 
                  key={city} 
                  onSelect={() => handleSelect(city)}
                  value={city}
                >
                  {city}
                </CommandItem>
              ))
            }
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
