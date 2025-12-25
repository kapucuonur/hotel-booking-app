'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Utensils, Car, Ticket, TrendingUp } from 'lucide-react';

interface BudgetPlannerProps {
    accommodationCost: number;
    nights: number;
    guests: number;
    city: string;
}

export function BudgetPlanner({ accommodationCost, nights, guests, city }: BudgetPlannerProps) {
    const [currency, setCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [customExpenses, setCustomExpenses] = useState({
        food: 50,
        transport: 30,
        activities: 40,
    });

    // Estimated daily costs per person (in USD)
    const dailyCosts = {
        food: customExpenses.food,
        transport: customExpenses.transport,
        activities: customExpenses.activities,
    };

    const totalAccommodation = accommodationCost;
    const totalFood = dailyCosts.food * nights * guests;
    const totalTransport = dailyCosts.transport * nights * guests;
    const totalActivities = dailyCosts.activities * nights * guests;
    const grandTotal = totalAccommodation + totalFood + totalTransport + totalActivities;

    const convertedTotal = grandTotal * exchangeRate;

    const categories = [
        {
            name: 'Accommodation',
            amount: totalAccommodation,
            icon: DollarSign,
            color: 'text-blue-600',
            editable: false,
        },
        {
            name: 'Food & Dining',
            amount: totalFood,
            icon: Utensils,
            color: 'text-orange-600',
            editable: true,
            key: 'food' as const,
        },
        {
            name: 'Transportation',
            amount: totalTransport,
            icon: Car,
            color: 'text-green-600',
            editable: true,
            key: 'transport' as const,
        },
        {
            name: 'Activities',
            amount: totalActivities,
            icon: Ticket,
            color: 'text-purple-600',
            editable: true,
            key: 'activities' as const,
        },
    ];

    return (
        <div className="bg-card border rounded-lg p-6 space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-1">Budget Planner</h3>
                <p className="text-sm text-muted-foreground">
                    Estimate your total trip cost for {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Currency:</label>
                <select
                    value={currency}
                    onChange={(e) => {
                        setCurrency(e.target.value);
                        // In a real app, fetch exchange rate here
                        setExchangeRate(e.target.value === 'EUR' ? 0.92 : e.target.value === 'GBP' ? 0.79 : 1);
                    }}
                    className="px-3 py-1.5 border rounded-md text-sm"
                >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                </select>
            </div>

            {/* Budget Breakdown */}
            <div className="space-y-3">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div key={category.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Icon className={`h-5 w-5 ${category.color}`} />
                            <div className="flex-1">
                                <div className="font-medium text-sm">{category.name}</div>
                                {category.editable && category.key && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            type="range"
                                            min="10"
                                            max="200"
                                            value={customExpenses[category.key]}
                                            onChange={(e) =>
                                                setCustomExpenses({
                                                    ...customExpenses,
                                                    [category.key]: parseInt(e.target.value),
                                                })
                                            }
                                            className="flex-1 h-1"
                                        />
                                        <span className="text-xs text-muted-foreground w-16">
                                            ${customExpenses[category.key]}/day
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">
                                    ${category.amount.toFixed(2)}
                                </div>
                                {category.editable && (
                                    <div className="text-xs text-muted-foreground">
                                        per person
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total */}
            <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Estimated Total</span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                            {currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}
                            {convertedTotal.toFixed(2)}
                        </div>
                        {currency !== 'USD' && (
                            <div className="text-xs text-muted-foreground">
                                ≈ ${grandTotal.toFixed(2)} USD
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Accommodation: ${totalAccommodation.toFixed(2)}</p>
                    <p>• Daily expenses: ${(totalFood + totalTransport + totalActivities).toFixed(2)} ({guests} {guests === 1 ? 'guest' : 'guests'} × {nights} {nights === 1 ? 'night' : 'nights'})</p>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                    💡 <strong>Tip:</strong> Adjust the sliders above to customize your daily budget estimates based on your travel style.
                </p>
            </div>
        </div>
    );
}
