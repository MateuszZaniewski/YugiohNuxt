export const useUtils = () => {
    const useSetAttribute = (card) => {
        return card.attribute === "DARK"
          ? "./Attributes/DARK.png"
          : card.attribute === "LIGHT"
          ? "./Attributes/LIGHT.png"  
          : card.attribute === "EARTH"
          ? "./Attributes/EARTH.png"
          : card.attribute === "WATER"
          ? "./Attributes/WATER.png"
          : card.attribute === "FIRE"
          ? "./Attributes/FIRE.png"
          : card.attribute === "WIND"
          ? "./Attributes/WIND.png"
          : card.attribute === "DIVINE"
          ? "./Attributes/DIVINE.png"
          : card.type === "Spell Card"
          ? "./Attributes/SPELL.svg"
          : card.type === "Trap Card"
          ? "./Attributes/TRAP.svg"
          : "xD";
      };
      const useSetCardType = (card) => {
        return card.race === "Continuous"
          ? "./CardTypes/Continuous.png"
          : card.race === "Counter"
          ? "./CardTypes/Counter.png"
          : card.race === "Equip"
          ? "./CardTypes/Equip.png"
          : card.race === "Field"
          ? "./CardTypes/Field.png"
          : card.race === "Normal"
          ? "./CardTypes/Normal.png"
          : card.race === "Quick-Play"
          ? "./CardTypes/Quick-Play.png"
          : "./CardTypes/Ritual.png";
      };
    return {
        useSetAttribute,
        useSetCardType,
    }
}
