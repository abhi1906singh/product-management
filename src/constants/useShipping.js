import { computed } from 'vue';

export const shippingData = [
  { id: 1, value: 'standard', label: 'Standard', default: true },
  { id: 2, value: 'express', label: 'Express' },
  { id: 3, value: 'next_day', label: 'Next Day' },
  { id: 4, value: 'five_days', label: 'With in five days' }
];
export const returnPolicyData=[
    {id:24,value:"19" , label:"7 days"},
    {id:23,value:"10" , label:"10 days"},
    {id:25,value:"30" , label:"30 days"}
];
export const publicationStatusData=[
    {id:45,value:"Draft" , label:"Draft"},
    {id:45,value:"Published" , label:"Published"},
    {id:45,value:"Scheduled" , label:"Scheduled"}
]

export function useShipping(weight, weightUnit) {
  const isEligibleForNextDay = computed(() => {
    if (!weight.value) return true;
    const weightVal = parseFloat(weight.value);
    
    switch(weightUnit.value) {
      case 'kg': return weightVal < 5;
      case 'g': return weightVal < 5000;
      case 'lb': return weightVal < 11;
      case 'oz': return weightVal < 176;
      default: return true;
    }
  });

  return { isEligibleForNextDay };
}